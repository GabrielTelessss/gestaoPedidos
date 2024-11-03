function ListaProdutos({ produtos, onRemover}) {
  return (
    <div className="lista-container">
      <h2>Lista de Produtos</h2>
      {produtos.length === 0 ? (
        <p>Nenhum produto cadastrado.</p>
      ) : (
        <ul>
          {produtos.map((produto) => (
            <li key={produto.id} className="produto-item">
              <div className="produto-info">
                <span>{produto.nome}</span>
                <span> - R$ {produto.preco.toFixed(2)}</span>
              </div>
              <div className="produto-acoes">
                <button 
                  onClick={() => onRemover(produto.id)}
                  className="botao-remover"
                >
                  Remover
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default ListaProdutos