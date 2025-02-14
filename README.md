
# trainjs

Exercicios basicos de JS

## Rodar os testes

```bash
  npm run test:dev
  or
  yarn test:dev
```

## Exemplo

Alterar somente o arquivo `src/index.js`. Utilizar o arquivo `test/index.test.js` apenas para verificar o que deve ser feito.

`test/index.test.js`
```javascript
...
    it('a funcao somarExemplo deve receber como parametros dois numero a serem somados. retornar a soma dos numeros', () => {
        assert.strictEqual(somarExemplo(1, 2), 3)
    })
...
```

`src/index.js`
```javascript
...
    somarExemplo (a, b) {
        return a + b
    },
...
```

