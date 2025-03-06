---
title: 将wsl安装到非C盘位置
date: '2024-01-15'
tags: ['WSL']
draft: false
summary: WSL安装
layout: 'PostBannerInfo'
---

要删除当前的 WSL `Ubuntu-22.04` 并在 **D 盘** 重新安装，你可以按照以下步骤操作：

---

### **1. 备份重要数据（如果有）**

如果你的 WSL 内有重要数据，建议先备份：

```sh
wsl --export Ubuntu-22.04 D:\backup\ubuntu_backup.tar
```

这样可以在以后恢复：

```sh
wsl --import Ubuntu-22.04 D:\WSL\Ubuntu-22.04 D:\backup\ubuntu_backup.tar
```

---

### **2. 卸载 WSL Ubuntu-22.04**

#### **方法 1：使用 WSL 命令**

1. **彻底卸载当前 WSL `Ubuntu-22.04`**

   ```sh
   wsl --unregister Ubuntu-22.04
   ```

   这会**彻底删除** WSL 中的 `Ubuntu-22.04`，包括所有文件，无法恢复。

2. **检查是否成功卸载**
   ```sh
   wsl --list --verbose
   ```
   如果 `Ubuntu-22.04` 不在列表中，说明删除成功。

#### **方法 2：从 Windows 设置卸载**

1. 打开 **设置 > 应用 > 已安装的应用**。
2. 搜索 `Ubuntu 22.04`，点击 **卸载**。

---

### **3. 在 D 盘安装 WSL Ubuntu-22.04**

WSL 默认会安装到 `C:\Users\<你的用户名>\AppData\Local\Packages`，但我们可以手动安装到 D 盘。

#### **方法 1：使用 `wsl --import`**

1. 下载 `Ubuntu-22.04` 安装包（如果没有）：

   ```sh
   wsl --install -d Ubuntu-22.04
   ```

   这样会先在默认路径安装，我们之后会移动它。

2. **导出 Ubuntu**

   ```sh
   wsl --export Ubuntu-22.04 D:\WSL\Ubuntu-22.04.tar
   ```

3. **删除 Ubuntu**

   ```sh
   wsl --unregister Ubuntu-22.04
   ```

4. **导入到 D 盘**

   ```sh
   wsl --import Ubuntu-22.04 D:\WSL\Ubuntu-22.04 D:\WSL\Ubuntu-22.04.tar
   ```

5. **启动新 WSL**
   ```sh
   wsl -d Ubuntu-22.04
   ```

---

### **4. 设置默认用户**

如果进入后默认是 `root`，可以设置默认用户：

```sh
ubuntu2204 config --default-user ebbid
```

或者：

```sh
wsl -d Ubuntu-22.04 -u ebbid
```

---

### **5. 确保安装到 D 盘**

在 PowerShell 运行：

```sh
wsl --list --verbose
```

然后检查 `Ubuntu-22.04` 的存储路径：

```sh
wslpath /
```

如果是 `D:\WSL\Ubuntu-22.04`，说明安装成功。

---

这样 `Ubuntu-22.04` 就安装到了 **D 盘**。你可以尝试运行 `wsl -d Ubuntu-22.04` 来启动它。有什么问题可以告诉我！
