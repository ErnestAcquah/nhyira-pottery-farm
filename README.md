# Nhyira Pottery Farm Company — full-stack starter

Business data:
- Phone/WhatsApp: 0530801719
- Email: NhyirafresheggAjumakoEsikado3@gmail.com
- Location: Ajumako Esikado
- Eggs: GH₵45 / tray of 30
- Chicken: GH₵120 / chicken
- Delivery: available
- Slogan: Fresh Protein, Our Goal.
- Type: Sole proprietorship

Included:
- Customer storefront
- SQLite order database
- Cart
- Checkout/order creation
- Admin login
- Admin order management and statuses
- Product stock/price data model
- WhatsApp links
- Paystack integration placeholder
- Ready for deployment

Run:
1. Install Node.js 20+.
2. Copy .env.example to .env and change ADMIN_PASSWORD and SESSION_SECRET.
3. Run npm install.
4. Run npm start.
5. Open http://localhost:3000
6. Admin: http://localhost:3000/admin.html

Production requirements before launch:
- Real hosting with HTTPS
- Strong admin credentials and secure session configuration
- Paystack merchant account and server-side payment initialization + verification
- Production database/backups
- WhatsApp Business/API provider if automated server-side notifications are required
- Custom domain and DNS
- Delivery fee/coverage rules
- Final business/legal/privacy/terms details

Do not put a Paystack secret key in browser JavaScript.
