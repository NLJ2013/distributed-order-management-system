export default () => ({
  serviceName: 'Order Service',
  database: {
    uri:
      process.env.DB_URI ||
      'mongodb://127.0.0.1:27017/srv-order?directConnection=true&serverSelectionTimeoutMS=2000',
  },
  namespace: process.env.NAMESPACE || 'development',
});
