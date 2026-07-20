const { initializeApp } = require('firebase/app');
const { 
  getFirestore, 
  collection, 
  addDoc, 
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager
} = require('firebase/firestore');

console.log('--- STARTING FIREBASE E2E INTEGRATION TEST ---');

// Initialize Firebase App
const firebaseConfig = {
  apiKey: "AIzaSyDummyKeyForTestingCompatibility",
  authDomain: "haxrat-security-test.firebaseapp.com",
  projectId: "haxrat-security-test",
  storageBucket: "haxrat-security-test.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:a1b2c3d4e5f6g7h8i9j0kl"
};

try {
  const app = initializeApp(firebaseConfig);
  console.log('1. Firebase App initialized successfully. Name:', app.name);

  // Initialize Firestore with local persistence caching to trigger serializing/deserializing libraries (protobuf/grpc-js)
  const db = initializeFirestore(app, {
    localCache: persistentLocalCache({
      tabManager: persistentMultipleTabManager()
    })
  });
  console.log('2. Firestore initialized with persistence components.');

  // Test protobufjs & grpc-js loading dependencies
  const grpc = require('@grpc/grpc-js');
  console.log('3. @grpc/grpc-js successfully loaded. Class: Client =', typeof grpc.Client === 'function');

  const protobuf = require('protobufjs');
  console.log('4. protobufjs successfully loaded. Root =', typeof protobuf.Root === 'function');

  // Exercise protobuf coding/decoding to ensure compatibility
  const root = new protobuf.Root();
  const Namespace = root.define('test').add(new protobuf.Type('Message').add(new protobuf.Field('value', 1, 'string')));
  const messageInstance = Namespace.lookupType('Message').create({ value: 'SecurityUpdateTested' });
  const encoded = Namespace.lookupType('Message').encode(messageInstance).finish();
  const decoded = Namespace.lookupType('Message').decode(encoded);
  console.log('5. Protobuf codectest succeeded. Decoded value:', decoded.value);

  console.log('--- FIREBASE E2E INTEGRATION TEST COMPLETED SUCCESSFULLY ---');
  process.exit(0);
} catch (error) {
  console.error('--- FIREBASE E2E INTEGRATION TEST FAILED ---');
  console.error(error);
  process.exit(1);
}
