import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

// Verifica fallos y confirmaciones sin enviar correos reales.
const source = fs.readFileSync(new URL('../sitio/script.js', import.meta.url), 'utf8');
const formSource = source.slice(source.indexOf('const quoteForm ='));
const run = async ({ response, error, valid = true, disabled = false, honey = '' }) => {
    let handler;
    let resets = 0;
    let requests = 0;
    let submitted;
    const label = { textContent: '' };
    const button = { disabled, querySelector: () => label };
    const status = { textContent: '', classList: { toggle() {} } };
    const form = {
        querySelector: () => button,
        addEventListener: (name, fn) => { handler = fn; },
        reportValidity: () => valid,
        reset: () => { resets++; },
    };
    const data = { _honey: honey, name: 'Prueba local', email: 'test@example.com', phone: '000000000', city: 'Quito', sector: 'Prueba', message: 'Prueba sin envío real' };
    const context = vm.createContext({
        document: { querySelector: (s) => s === '#quote-form' ? form : status },
        window: { location: { protocol: 'https:', origin: 'https://www.extintseed.com', pathname: '/' }, setTimeout, clearTimeout },
        FormData: class { get(key) { return data[key]; } },
        AbortController,
        console: { error() {} },
        fetch: async (_url, options) => {
            requests++;
            submitted = JSON.parse(options.body);
            if (error) throw error;
            return { ok: response.ok, status: response.status || 200, json: async () => response.body };
        },
    });
    vm.runInContext(formSource, context);
    await handler({ preventDefault() {} });
    return { resets, requests, submitted, status: status.textContent, disabled: button.disabled };
};

for (const success of [true, 'true']) {
    const result = await run({ response: { ok: true, body: { success } } });
    assert.equal(result.resets, 1);
    assert.match(result.status, /enviada correctamente/);
    assert.equal(result.submitted['Página de contacto'], 'https://www.extintseed.com/');
    assert.equal(result.disabled, false);
}
for (const response of [
    { ok: true, body: {} },
    { ok: true, body: { success: false } },
    { ok: true, body: { success: 'false' } },
    { ok: false, status: 500, body: { success: true } },
]) {
    const result = await run({ response });
    assert.equal(result.resets, 0);
    assert.match(result.status, /No fue posible confirmar/);
    assert.equal(result.disabled, false);
}
const timeout = await run({ error: Object.assign(new Error('timeout'), { name: 'AbortError' }) });
assert.equal(timeout.resets, 0);
assert.match(timeout.status, /a tiempo/);
assert.equal(timeout.disabled, false);
for (const state of [{ valid: false }, { disabled: true }, { honey: 'bot' }]) {
    assert.equal((await run(state)).requests, 0);
}
console.log('Formulario: 10 casos correctos; ningún correo enviado durante la prueba.');
