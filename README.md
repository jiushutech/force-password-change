# Force Password Change

A Flarum extension that forces users to change their password on first login.

## 功能特性 / Features

- 🔐 管理员创建用户时自动标记需要修改密码
- 🚀 用户首次登录时强制修改密码
- ⚡ 无需邮箱验证流程
- 🌍 支持多语言界面
- 🎨 简洁的模态对话框设计

---

- 🔐 Automatically mark users to change password when created by admin
- 🚀 Force users to change password on first login
- ⚡ No email verification required
- 🌍 Multi-language support
- 🎨 Clean modal dialog design

## 支持的语言 / Supported Languages

本插件已内置 **21** 种语言翻译：

This extension includes **21** language translations:

| 语言 / Language | 代码 / Code | 文件 / File |
|----------------|------------|------------|
| 🇨🇳 简体中文 | zh-hans | zh-hans.yml |
| 🇹🇼 繁體中文 | zh-hant | zh-hant.yml |
| 🇺🇸 English | en | en.yml |
| 🇯🇵 日本語 | ja | ja.yml |
| 🇰🇷 한국어 | ko | ko.yml |
| 🇫🇷 Français | fr | fr.yml |
| 🇩🇪 Deutsch | de | de.yml |
| 🇪🇸 Español | es | es.yml |
| 🇷🇺 Русский | ru | ru.yml |
| 🇵🇹 Português | pt | pt.yml |
| 🇮🇹 Italiano | it | it.yml |
| 🇸🇦 العربية | ar | ar.yml |
| 🇳🇱 Nederlands | nl | nl.yml |
| 🇹🇷 Türkçe | tr | tr.yml |
| 🇵🇱 Polski | pl | pl.yml |
| 🇺🇦 Українська | uk | uk.yml |
| 🇳🇴 Norsk | no | no.yml |
| 🇸🇪 Svenska | sv | sv.yml |
| 🇩🇰 Dansk | da | da.yml |
| 🇫🇮 Suomi | fi | fi.yml |
| 🇬🇷 Ελληνικά | el | el.yml |

## 安装 / Installation

```bash
# 进入 Flarum 根目录
cd /path/to/flarum

# 通过 Composer 安装
composer require jiushutech/force-password-change:*@dev

# 运行数据库迁移
php flarum migrate

# 清除缓存
php flarum cache:clear

# 启用插件
php flarum extension:enable jiushutech-force-password-change
```

## 使用方法 / Usage

1. 安装并启用插件后，管理员创建的所有新用户将自动标记为需要修改密码
2. 用户首次登录时会自动弹出密码修改对话框
3. 用户必须修改密码后才能继续使用论坛
4. 密码修改成功后，标记自动清除

---

1. After installation, all new users created by admin will be automatically marked to change password
2. Users will see a password change dialog on first login
3. Users must change password before using the forum
4. The flag is automatically cleared after successful password change

## 开发 / Development

```bash
# 克隆仓库
git clone https://github.com/jiushutech/force-password-change.git

# 进入 js 目录
cd force-password-change/js

# 安装依赖
npm install

# 开发模式（监听文件变化）
npm run dev

# 生产环境构建
npm run build
```

## 发布到 Packagist / Publishing to Packagist

本插件已经配置好发布设置，**不会包含 node_modules** 等开发文件。

### 文件排除配置

通过以下文件控制发布内容：

1. **`.gitignore`** - Git 忽略文件
   - 排除 `node_modules/`、`vendor/` 等开发依赖
   - **保留** `js/dist/` 编译后的文件

2. **`.gitattributes`** - Git 导出控制
   - 使用 `export-ignore` 排除不必要的文件

3. **`composer.json`** - Composer 归档配置
   - `archive.exclude` 配置排除列表

### 发布流程

1. **编译前端资源**
   ```bash
   cd js
   npm install
   npm run build
   ```

2. **提交代码到 Git**
   ```bash
   git add .
   git commit -m "Release version X.X.X"
   git tag vX.X.X
   git push origin main --tags
   ```

3. **发布到 Packagist**
   - 在 [Packagist.org](https://packagist.org) 提交您的 GitHub 仓库地址
   - Packagist 会自动从 Git 拉取代码并排除不必要的文件

### 重要提示

- ✅ **必须提交** `js/dist/` 目录（包含编译后的 JS 文件）
- ❌ **不要提交** `js/node_modules/` 目录
- ✅ 用户通过 Composer 安装时会自动获得编译好的文件，无需自己编译
- ✅ 包体积会很小，因为排除了所有开发依赖

## 许可证 / License

[MIT](LICENSE)

## 支持 / Support

如有问题或建议，请提交 Issue 或 Pull Request。

For issues or suggestions, please submit an Issue or Pull Request.
