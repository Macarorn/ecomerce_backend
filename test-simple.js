// test-simple.js
console.log('Probando API...\n');

// Solo prueba lo esencial
try {
  // 1. Probar órdenes
  console.log('1. GET /orden');
  const ordenRes = await fetch('http://localhost:3000/rest/v1/orden');
  const ordenData = await ordenRes.json();
  console.log(`   Status: ${ordenRes.status}`);
  console.log(`   Data: ${JSON.stringify(ordenData)}`);
  
  console.log('\n2. GET /orden-producto');
  const opRes = await fetch('http://localhost:3000/rest/v1/orden-producto');
  const opData = await opRes.json();
  console.log(`   Status: ${opRes.status}`);
  console.log(`   Data: ${JSON.stringify(opData)}`);
  
} catch (error) {
  console.log('Error:', error.message);
  console.log('¿Está corriendo el servidor? (node index.js)');
}