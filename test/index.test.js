const { describe, it } = require('node:test')

const assert = require('node:assert/strict')

const {
  // Exemplo
  somarExemplo,
  // Array
  filtrarNumerosPares,
  multiplicarValores,
  somarValores,
  encontrarNumeroPar,
  encontrarNumeroIndex,
  // Objeto
  criarPropriedade,
  removerPropriedade,
  gerarObjetoGetSet,
  duplicarObjeto,
  // Array de Objetos
  filtrarObjetos,
  multiplicarPropriedade,
  somarPropriedade,
  encontrarObjeto,
  encontrarIndexObjeto,
} = require('./../src')

/*
* Exemplo
* exemplo de como criar a funcao com base no teste
* alterar o codigo apenas no arquivo src/index.js
*/
describe('exemplo de teste', () => {
  it('a funcao somarExemplo deve receber como parametros dois numero a serem somados. retornar a soma dos numeros', () => {
    assert.strictEqual(somarExemplo(1, 2), 3)
  })
})

/*
* Array
* funcoes basicas de array (filter, map, reduce, find, findIndex)
*/
describe('Funcoes basicas do Array', () => {
  it('filter: a funcao filtrarNumerosPares deve receber como parametros um array de numeros. retornar o array filtrado com apenas os numeros pares', () => {
    assert.strictEqual(filtrarNumerosPares([1,2,12,21,33,42]).length, 3)
  })

  it('map: a funcao multiplicarValores deve receber como parametros um array de numeros. retornar o array com seus valores multiplicados pelo seu index no array', () => {
    assert.deepStrictEqual(multiplicarValores([1,2,3,4]), [0, 2, 6, 12])
  })

  it ('reduce: a funcao somarValores deve receber como parametros um array de numeros. retornar a soma de todos seus valores', () => {
    assert.strictEqual(somarValores([10, 20, 30, 40]), 100)
    assert.strictEqual(somarValores([]), 0)
    assert.strictEqual(somarValores([10]), 10)
  })

  it('find: a funcao encontrarNumeroPar deve receber como parametros um array de numeros. retornar o primeiro item par no array. caso nao encontre, retorne null', () => {
    assert.strictEqual(encontrarNumeroPar([1,2,3,4]), 2)
    assert.strictEqual(encontrarNumeroPar([1,3]), null)
    assert.strictEqual(encontrarNumeroPar([]), null)
  })

  it('findIndex: a funcao encontrarNumeroIndex deve receber como parametros um array de numeros e o valor a ser encontrado. retornar o index do numero. caso nao encontre, retorne -1', () => {
    assert.strictEqual(encontrarNumeroIndex([1,2,3,4], 2), 1)
    assert.strictEqual(encontrarNumeroIndex([1,3], 2), -1)
    assert.strictEqual(encontrarNumeroIndex([], 2), -1)
  })
})

/*
* Objeto
* manipulacao de objetos e referencia direta
*/
describe('Manipulacao de Objeto', () => {
  it('atribuicao de propriedade: a funcao criarPropriedade deve receber como parametros um objeto a ser incluido a propriedade, o nome da propriedade a ser criada, e o valor da propriedade', () => {
    const obj = {}

    criarPropriedade(obj, 'x', 1)

    assert.deepStrictEqual(obj, {x:1})
  })

  it('remocao de propriedade: a funcao removerPropriedade deve receber como parametros um objeto a ser excluido a propriedade e o nome da propriedade a ser excluida', () => {
    const obj = {x:1}
    
    removerPropriedade(obj, 'x')

    assert.deepStrictEqual(obj, {})
  })

  it('funcoes em objetos: a funcao gerarObjetoGetSet deve retornar um objeto com as funcoes get e "get", onde a funcao get recebe como parametro a propriedade a ser retornada, e a funcao "set" recebe como parametros a propriedade a ser alterada e o valor da propriedade', () => {
    const obj = gerarObjetoGetSet()

    obj.set('x', 1)

    assert.strictEqual(obj.get('x'), 1)
  })

  it ('duplicar objetos: a funcao duplicarObjeto deve receber como parametro um objeto. retornar um clone desse objeto contento a propriedade "test" com o valor true', () => {
    const obj = gerarObjetoGetSet()

    obj.set('x', 2)

    const obj2 = duplicarObjeto(obj)

    obj2.set('x', 3)

    assert.strictEqual(obj2.test, true)
    assert.strictEqual(obj.hasOwnProperty('test'), false)
    assert.strictEqual(obj2.x, 3)
  })
})

/*
* Array de Objetos
* manipulacao de array de objetos
*/
describe('Manipulacao de Array Objetos', () => {
  it('a funcao filtrarObjetos deve receber como parametro um array de objetos, a propriedade a ser filtrada, e o valor da propriedade. retornar o array filtrado', () => {
    const arr = Array(10).fill(null).map((_, index) => {
      const obj = gerarObjetoGetSet()

      obj.set('par', index % 2 === 0)

      return obj
    })

    assert.strictEqual(filtrarObjetos(arr, 'par', true).length, 5)
  })

  it('a funcao multiplicarPropriedade deve receber como parametro um array de objetos, a propriedade a ser multiplicada, e o valor a ser multiplicado. retornar o array', () => {
    const arr = Array(10).fill(null).map((_, index) => {
      const obj = gerarObjetoGetSet()

      obj.set('index', index + 1)

      return obj
    })

    const n = 3

    const resultado = somarValores(arr.map(i => i.index * n))

    assert.deepStrictEqual(somarValores(multiplicarPropriedade(arr, 'index', n).map(i => i.index)), resultado)
  })
  
  it('a funcao somarPropriedade deve receber como parametro um array de objetos e a propriedade a ser somada. retornar a soma das propriedades', () => {
    const arr = Array(10).fill(null).map((_, index) => {
      const obj = gerarObjetoGetSet()

      obj.set('index', index + 1)

      return obj
    })

    assert.strictEqual(somarPropriedade(arr, 'index'), somarValores(arr.map(i => i.index)))
    assert.strictEqual(somarPropriedade([{index: 1}], 'index'), 1)
    assert.strictEqual(somarPropriedade([], 'index'), 0)
  })

  it('a funcao encontrarObjeto deve receber como parametro um array de objetos, a propriedade a ser buscada, e o valor da propriedade buscada. retornar o objeto. caso nao encontre, retorne null', () => {
    const arr = Array(10).fill(null).map((_, index) => {
      const obj = gerarObjetoGetSet()

      obj.set('index', index + 1)

      return obj
    })

    assert.deepStrictEqual(encontrarObjeto(arr, 'index', 2), arr[1])
    assert.strictEqual(encontrarObjeto(arr, 'index', 0), null)
    assert.strictEqual(encontrarObjeto([], 'index', 0), null)
  })

  it('a funcao encontrarIndexObjeto deve receber como parametro um array de objetos, a propriedade a ser buscada, e o valor da propriedade buscada. retornar o index do objeto. caso nao encontre, retorne -1', () => {
    const arr = Array(10).fill(null).map((_, index) => {
      const obj = gerarObjetoGetSet()

      obj.set('index', index + 1)

      return obj
    })

    assert.deepStrictEqual(encontrarIndexObjeto(arr, 'index', 2), 1)
    assert.strictEqual(encontrarIndexObjeto(arr, 'index', 0), -1)
    assert.strictEqual(encontrarIndexObjeto([], 'index', 0), -1)
  })
})
