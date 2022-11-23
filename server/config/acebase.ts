import { AceBaseServer } from 'acebase-server';

const server = new AceBaseServer('store2go', {
  host: 'localhost',
  port: 5757,
  transactions: {
    log: true, // Enable
    maxAge: 30, // Keep logs of last 30 days
    noWait: false, // Data changes wait for log to be written
  },
  authentication: {
    enabled: true,
    allowUserSignup: true,
    defaultAccessRule: 'auth',
    defaultAdminPassword: 'admin',
  },
});

server.db.indexes.create('inventory/products', 'sku');
server.db.indexes.create('inventory/products', 'description');
server.db.indexes.create('inventory/products', 'brand');
server.db.indexes.create('inventory/products', 'category');
server.db.indexes.create('inventory/products', 'supplier');
server.db.indexes.create('orders', 'status');
server.db.indexes.create('orders', 'createdAt');
server.db.indexes.create('orders', 'orderId');

export { server };
