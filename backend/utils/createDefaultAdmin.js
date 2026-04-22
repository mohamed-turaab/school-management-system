const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');

async function createDefaultAdmin() {
  const email = process.env.ADMIN_EMAIL || 'admin@example.com';
  const password = process.env.ADMIN_PASSWORD || 'admin123';

  const existingAdmin = await Admin.findOne({ email });

  if (existingAdmin) {
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await Admin.create({
    email,
    password: hashedPassword
  });

  console.log(`Default admin created: ${email}`);
}

module.exports = createDefaultAdmin;
