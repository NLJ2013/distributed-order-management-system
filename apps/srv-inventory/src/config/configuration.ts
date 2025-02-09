export default () => ({
  serviceName: 'Inventory Service',
  port: 3000,
  database: {
    uri:
      process.env.DB_URI ||
      'mongodb://127.0.0.1:27017/srv-inventory?directConnection=true&serverSelectionTimeoutMS=2000',
  },
  namespace: process.env.NAMESPACE || 'development',
});
