# Force Password Change / 强制修改密码

[English](#english) | [简体中文](#简体中文)

---

## English

A Flarum extension that forces users to change their password on first login.

### Features

- Forces password change on first login for admin-created users
- No email verification required
- Multi-language support (21 languages included)
- Clean modal interface

### Installation

```bash
composer require jiushutech/force-password-change
php flarum migrate
php flarum cache:clear
```

### Usage

1. Install and enable the extension
2. When admin creates a user, they are automatically flagged
3. On first login, user must change password
4. Flag is cleared after successful password change

### Development

```bash
cd js
npm install
npm run dev    # Development mode
npm run build  # Production build
```

### License

MIT

---

## 简体中文

这是一个 Flarum 扩展，强制管理员创建的用户在首次登录时修改密码。

### 功能特性

- 管理员创建用户时自动标记需要修改密码
- 无需邮箱验证流程
- 支持 21 种语言
- 简洁的对话框界面

### 安装方法

```bash
composer require jiushutech/force-password-change
php flarum migrate
php flarum cache:clear
```

### 使用说明

1. 安装并启用插件
2. 管理员创建用户时自动添加标记
3. 用户首次登录时必须修改密码
4. 修改成功后标记自动清除

### 开发

```bash
cd js
npm install
npm run dev    # 开发模式
npm run build  # 生产构建
```

### 许可证

MIT

## 许可证 / License

[MIT](LICENSE)

## 支持 / Support

如有问题或建议，请提交 Issue 或 Pull Request。

For issues or suggestions, please submit an Issue or Pull Request.
