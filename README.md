# Empire Furniture World — Admin-enabled site

This version keeps the existing public storefront and adds a protected `/admin` dashboard.

## Admin features
- Add an unlimited number of products subject to Netlify plan/storage limits.
- Upload a product image directly from a phone or computer.
- Remove products.
- Products and uploaded images are stored in Netlify Blobs.

## Required Netlify environment variable
Create `ADMIN_PASSWORD` in Netlify Environment variables. Use the same value for Production, then redeploy after changing it. Never commit the password to GitHub.

Image uploads are limited to 4 MB per image by the function request limit.
