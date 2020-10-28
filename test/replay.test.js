const {getApi, getKeypair} = require('../utils/pollkadot')
const should = require('should');


describe('Halva test', () => {
    it('should fail to replay a tx', async () => {
        const api = await getApi()
        const alice = getKeypair('//Alice')
        const nonce = await api.rpc.system.accountNextIndex(alice.address);
        const tx = api.tx.balances.transfer(bobPair.address, "1").sign(alice, {nonce})
        await tx.send()
        await passes(tx, 'Send', alicePair);
        try {
            await tx.send()
            should.fail("tx was replayed")
        } catch (e) {
            console.log("tx failed replay")
            assert.equal(
                e.message,
                "1010: Invalid Transaction: Transaction is outdated"
                )
        }

    })

})
