const acebaseServer = new AceBaseServer("store2go", {
  host: "localhost",
  port: 5757,
  transactions: {
    log: true, // Enable
    maxAge: 30, // Keep logs of last 30 days
    noWait: false, // Data changes wait for log to be written
  },
  authentication: {
    enabled: true,
    allowUserSignup: true,
    defaultAccessRule: "auth",
    defaultAdminPassword: "admin",
  },
});

acebaseServer.db.indexes.create("inventory/products", "sku");
acebaseServer.db.indexes.create("inventory/products", "description");
acebaseServer.db.indexes.create("inventory/products", "brand");
acebaseServer.db.indexes.create("inventory/products", "category");
acebaseServer.db.indexes.create("inventory/products", "supplier");
acebaseServer.db.indexes.create("orders", "status");
acebaseServer.db.indexes.create("orders", "createdAt");
acebaseServer.db.indexes.create("orders", "orderId");

module.exports = { acebaseServer };
