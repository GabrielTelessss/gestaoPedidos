import './Header.css'
import Logo from '../image/order.svg'
function Header({ setActiveScreen }) {
  return (
    <header>
      <div className='logo'>
        <img src={Logo} alt="logo" />
        <h1>Gestão de Pedidos</h1>
      </div>
      <nav>
        <button onClick={() => setActiveScreen('cadastro')}>
          Cadastrar Produto
        </button>
        <button onClick={() => setActiveScreen('lista')}>
          Lista de Produtos
        </button>
        <button onClick={() => setActiveScreen('pedido')}>
          Pedido
        </button>
        <button onClick={() => setActiveScreen('entregas')}>
          Entregas
        </button>
        <button onClick={() => setActiveScreen('relatorios')}>
          Relatório
        </button>
      </nav>
    </header>
  )
}

export default Header