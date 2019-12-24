const db = require('../config');
var Rx = require('rxjs/Rx');
const {Pool} = require('pg');
const pool = new Pool(db.dbConfig);

module.exports = {
    request: function (q) {
        return Rx.Observable.create((observer) => {
            (async () => {
                const client = await pool.connect();
                try {
                    await client.query('BEGIN');
                    const result = await client.query(q);
                    await client.query('COMMIT');
                    observer.next(result.rows);
                    //return (result.rows);
                } catch (e) {
                    await client.query('ROLLBACK');
                    throw e;
                } finally {
                    client.release()
                }
            })().catch(e => {
                console.log(e.stack);
                return {error: e.detail};
            });
        })
    }
};
