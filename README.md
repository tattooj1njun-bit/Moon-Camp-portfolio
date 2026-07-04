# LUMO 产品设计作品集单页

项目名称：《LUMO——基于专注陪伴体验的情绪交互台灯设计》

这是一个使用 React + Vite + Tailwind CSS 制作的响应式产品设计作品集单页网站，无后端依赖，可直接部署到 Vercel。

## 本地运行

```bash
npm install
npm run dev
```

## 构建检查

```bash
npm install
npm run build
```

构建产物会生成在 `dist` 目录。

## Vercel 部署设置

本项目已提供 `vercel.json`，Vercel 可使用以下设置：

- Install Command: `npm install`
- Build Command: `npm run build`
- Output Directory: `dist`

## 部署方式

推荐方式：把项目上传到 GitHub，然后在 Vercel 新建项目并导入该仓库。之后每次推送代码，Vercel 都会自动重新部署。

也可以使用 Vercel CLI：

```bash
npm i -g vercel
vercel login
vercel --prod
```

部署完成后，Vercel 会生成一个公开网址，把这个网址发给老师即可查看。
