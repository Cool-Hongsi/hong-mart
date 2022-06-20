# Hong Mart (NextJS & ReactJS)

## # Deploy with Vercel
[Hong Mart](https://hong-mart.vercel.app)

## # Setting Up
1. git clone https://github.com/Cool-Hongsi/hong-mart.git
2. npm install
3. Create .env files (It contains private information. If you need, please contact me!)
4. npm run dev

## # Introduction
- This is simple shopping website created by NextJS and ReactJS.
- Client side with ReactJS (+ Redux, Saga)
- Server side with NextJS (+ NextAuth for OAuth Providers (Github, Google))
- Database with MongoDB
- Styling with SCSS

## # Feature
### - Admin Page
- Create, Read, Update, Delete products
```
/admin
username: hongsi
password: abcd1234
```
### - User Page
- Shop by fruit, grocery, meal
- Detail product information
- Shop by search term
- Cart with summary (Store selected products info in local storage)
- OAuth providers (Github, Google)
```
/shop/[category]
=> /shop/fruit
=> /shop/grocery
=> /shop/meal

/shop/[category]/detail?productId=*****

/shop/search?searchby=*****

/cart

/auth
=> Manage session status
```