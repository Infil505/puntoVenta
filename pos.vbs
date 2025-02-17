Dim objShell, shell
Set objShell = CreateObject("Shell.Application")

' Verificar si el script ya está ejecutándose con privilegios de administrador
If Not IsElevated() Then
    ' Si no se está ejecutando con privilegios, pedir permisos de administrador
    objShell.ShellExecute "cmd.exe", "/c start-next.bat && exit", "", "runas", 1
    WScript.Quit ' Finaliza el script después de pedir los permisos
End If

' Comprobar si ya hay un proceso de npm start corriendo en el puerto 3000
Set objWMIService = GetObject("winmgmts:\\.\root\cimv2")
Set colItems = objWMIService.ExecQuery("Select * from Win32_Process Where CommandLine Like '%npm%'")

Dim serverRunning
serverRunning = False

For Each objItem In colItems
    If InStr(objItem.CommandLine, "npm start") > 0 Then
        serverRunning = True
        Exit For
    End If
Next

If Not serverRunning Then
    ' Si el servidor no está en ejecución, ejecuta el .bat
    Set shell = CreateObject("WScript.Shell")
    ' Ejecutar el .bat con una ventana de consola para mostrar la barra de progreso
    shell.Run "cmd.exe /c iniciador.bat && exit", 1, True ' Usar "True" para esperar a que termine
    Set shell = Nothing
End If

' Esperar a que el proceso de compilación o instalación termine antes de iniciar el servidor
WScript.Sleep 5000 ' Esperar 5 segundos para asegurarse de que npm install / build ha terminado

' Iniciar el servidor si no se está ejecutando (sin mostrar la ventana del cmd)
If Not serverRunning Then
    Set shell = CreateObject("WScript.Shell")
    shell.Run "cmd.exe /c npm start >nul 2>&1", 0, False ' Inicia npm start en segundo plano sin mostrar la ventana
    Set shell = Nothing
End If

' Abrir la URL en el navegador
Set shell = CreateObject("WScript.Shell")
shell.Run "http://localhost:3000", 1, False
Set shell = Nothing
Set objShell = Nothing

' Función para verificar si el script tiene privilegios elevados
Function IsElevated()
    Dim objFSO, objFolder
    Set objFSO = CreateObject("Scripting.FileSystemObject")
    Set objFolder = objFSO.GetFolder("C:\Windows\System32")
    On Error Resume Next
    IsElevated = (Err.Number = 0)
    On Error GoTo 0
End Function

' Añadir un exit para cerrar todo el proceso de forma segura
WScript.Quit
