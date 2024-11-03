import { useState } from 'react'

function CadastroProduto({ produtos, setProdutos }) {
  const [nomeProduto, setNomeProduto] = useState('')
  const [precoProduto, setPrecoProduto] = useState('')

  const adicionarProduto = (e) => {
    e.preventDefault()
    if (nomeProduto && precoProduto) {
      const novoProduto = {
        id: Date.now(),
        nome: nomeProduto,
        preco: Number(precoProduto)
      }
      setProdutos([...produtos, novoProduto])
      setNomeProduto('')
      setPrecoProduto('')
    }
  }

  return (
    <div className="cadastro-container">
      <h2>Cadastrar Produto</h2>
      <form onSubmit={adicionarProduto}>
        <input 
          type="text" 
          placeholder="Nome do Produto"
          value={nomeProduto}
          onChange={(e) => setNomeProduto(e.target.value)}
          required
        />
        <input 
          type="number" 
          placeholder="Preço do Produto"
          value={precoProduto}
          onChange={(e) => setPrecoProduto(e.target.value)}
          required
          step="0.01"
          min="0"
        />
        <button type="submit">Adicionar Produto</button>
      </form>
    </div>
  )
}

export default CadastroProduto