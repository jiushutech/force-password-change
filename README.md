# Force Password Change / 强制修改密码

[![Latest Version](https://img.shields.io/github/v/release/jiushutech/force-password-change)](https://github.com/jiushutech/force-password-change/releases)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Flarum](https://img.shields.io/badge/flarum-%5E1.8.0-orange.svg)](https://flarum.org)

这是一个Flarum扩展，强制管理员创建的用户在首次登录时更改密码，并提供实时密码验证反馈。

[English](#english) | [简体中文](#简体中文)

---

## English

This is a Flarum extension that forces users created by administrators to change their password on their first login, with real-time password validation feedback.

### ✨ Features

#### v2.0.0 New Features
- 🎯 **Real-time Password Validation**: Live feedback as users type their password
- ✓ **Visual Password Strength Indicator**: Green checkmarks for met requirements, gray circles for unmet
- ⚙️ **Comprehensive Admin Settings**: Configure password policies in admin panel
- 🇨🇳 **Fully Localized**: Complete Chinese interface

#### Core Features
- Forces password change on first login for admin-created users
- Customizable password requirements
- No email verification required
- Clean modal interface
- Multi-language support

### 🔐 Password Policy Settings

Administrators can configure:
- Minimum password length (1-100 characters)
- Require uppercase letters (A-Z)
- Require lowercase letters (a-z)
- Require numbers (0-9)
- Require special characters (!@#$%^&*...)

### 📦 Installation

```bash
composer require jiushutech/force-password-change
php flarum migrate
php flarum cache:clear
```

### 🚀 Usage

1. Install and enable the extension
2. Configure password policy in admin panel (optional)
3. When admin creates a user, they are automatically flagged
4. On first login, user sees password change modal with requirements
5. User inputs password and sees real-time validation
6. Flag is cleared after successful password change

### 📸 Screenshots

**Password Requirements Display:**
```
Password Requirements:
✓ At least 8 characters
✓ At least one uppercase letter (A-Z)
○ At least one lowercase letter (a-z)
✓ At least one number (0-9)
○ At least one special character (!@#$%^&*...)
```

### 🛠️ Development

```bash
cd js
npm install
npm run dev    # Development mode with watch
npm run build  # Production build
```

### 📖 Documentation

- [CHANGELOG.md](CHANGELOG.md) - Version history
- [DEPLOY.md](DEPLOY.md) - Deployment guide
- [UX_IMPROVEMENT.md](UX_IMPROVEMENT.md) - UX improvements

### 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### 📄 License

MIT

---

## 简体中文

这是一个Flarum扩展，强制管理员创建的用户在首次登录时更改密码，并提供实时密码验证反馈。

### ✨ 功能特性

#### v2.0.0 新功能
- 🎯 **实时密码验证**：输入密码时即时反馈验证结果
- ✓ **可视化密码强度指示器**：满足要求显示绿色✓，未满足显示灰色○
- ⚙️ **完整的后台管理设置**：在管理面板配置密码策略
- 🇨🇳 **完全中文化**：所有界面均为中文

#### 核心功能
- 管理员创建用户时自动标记需要修改密码
- 可自定义密码要求
- 无需邮箱验证流程
- 简洁的对话框界面
- 支持多种语言

### 🔐 密码策略设置

管理员可配置：
- 最小密码长度（1-100 字符）
- 需要大写字母（A-Z）
- 需要小写字母（a-z）
- 需要数字（0-9）
- 需要特殊字符（!@#$%^&*...）

### 📦 安装方法

```bash
composer require jiushutech/force-password-change
php flarum migrate
php flarum cache:clear
```

### 🚀 使用说明

1. 安装并启用插件
2. 在后台配置密码策略（可选）
3. 管理员创建用户时自动添加标记
4. 用户首次登录时看到密码修改弹窗和要求
5. 用户输入密码时看到实时验证反馈
6. 修改成功后标记自动清除

### 📸 界面预览

**密码要求显示：**
```
密码要求：
✓ 至少 8 个字符
✓ 至少一个大写字母 (A-Z)
○ 至少一个小写字母 (a-z)
✓ 至少一个数字 (0-9)
○ 至少一个特殊字符 (!@#$%^&*...)
```

### 🛠️ 开发

```bash
cd js
npm install
npm run dev    # 开发模式（实时监控）
npm run build  # 生产构建
```

### 📖 文档

- [CHANGELOG.md](CHANGELOG.md) - 版本更新历史
- [DEPLOY.md](DEPLOY.md) - 部署指南
- [UX_IMPROVEMENT.md](UX_IMPROVEMENT.md) - 用户体验改进说明

### 🤝 贡献

欢迎贡献！请随时提交 Pull Request。

### 📄 许可证

[MIT](LICENSE)

## 支持 / Support

如有问题或建议，请提交 Issue 或 Pull Request。

For issues or suggestions, please submit an Issue or Pull Request.

- **GitHub Issues**: https://github.com/jiushutech/force-password-change/issues
- **Email**: it_admin@ninesure.com

---

**🎉 v2.0.0 - 让密码修改变得简单、直观、安全！**
