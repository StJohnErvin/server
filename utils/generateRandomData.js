function generateRandomData() {
    return {
        name: `User${Math.floor(Math.random() * 100)}`,
        age: Math.floor(Math.random() * 100),
        status: ['active', 'inactive', 'pending'][Math.floor(Math.random() * 3)],
        details: {
            timestamp: new Date().toISOString(),
            score: parseFloat(Math.random().toFixed(2)),
        }
    };
}

module.exports = generateRandomData;
