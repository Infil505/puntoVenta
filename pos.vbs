Dim objShell, shell
Set objShell = CreateObject("Shell.Application")

' Verificar si el script ya está ejecutándose con privilegios de administrador
If Not IsElevated() Then
    ' Si no se está ejecutando con privilegios, pedir permisos de administrador
    objShell.ShellExecute "cmd.exe", "/c start-next.bat", "", "runas", 1
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
    shell.Run "cmd.exe /c iniciador.bat", 0, False
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
