import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

export const putDb = async (content) => {
  console.log('Add content to the database');
  // here we are creating a connection to the jate database using version 1
  const jateDb = await openDB('jate', 1);
  // this is creating a new transaction with the jate database with readwrite privileges
  const tx = jateDb.transaction('jate', 'readwrite');
  // this opens the object store for the jate db
  const store = tx.objectStore('jate');
  // we should clear out the store so we only have the most up to date content in the object store
  store.clear();
  // the .put method will set the content of the store to the content passed here
  const request = store.put({ content: content });
  
  const result = await request;
  console.log('content saved to the database', result);
};

export const getDb = async () => {
  console.log('Get content from the database');

  const jateDb = await openDB('jate', 1);
  // this transaction is readonly because we are doing a get request and we're 
  // only viewing the content, not making any changes
  const tx = jateDb.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  // we use the getAll method to retrieve all the data in the jate db
  const request = store.getAll();
  const result = await request;
  console.log('result.value', result);
  if (result.length > 0) {
    return result[0].content;
  }
  else {
    return null;
  }
};

initdb();
