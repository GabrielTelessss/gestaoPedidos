import React from 'react';
import jsPDF from 'jspdf';
import './Relatorio.css'

const gerarLinkGoogleMaps = (endereco) => {
  const enderecoFormatado = `${endereco.rua}, ${endereco.numero}, ${endereco.bairro}, ${endereco.cidade}`
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(enderecoFormatado)}`
}

function Relatorios({ produtos, pedidos }) {

  const gerarRelatorioProdutos = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;
    const margin = 10;
    let yPos = margin;

    doc.setFontSize(16);
    doc.text("Relatório de Produtos", pageWidth / 2, yPos, { align: 'center' });
    yPos += 10;

    doc.setFontSize(12);
    produtos.forEach((produto, index) => {
      const produtoText = `${index + 1}. ${produto.nome} - R$ ${produto.preco.toFixed(2)}`;
      const textWidth = doc.getStringUnitWidth(produtoText) * doc.internal.getFontSize() / doc.internal.scaleFactor;

      if (yPos > pageHeight - margin) {
        doc.addPage();
        yPos = margin;
      }

      if (textWidth > pageWidth - 2 * margin) {
        const splitText = doc.splitTextToSize(produtoText, pageWidth - 2 * margin);
        doc.text(splitText, margin, yPos);
        yPos += splitText.length * 7;
      } else {
        doc.text(produtoText, margin, yPos);
        yPos += 7;
      }
    });

    doc.save("relatorio_produtos.pdf");
  };

  const gerarRelatorioPedidos = () => {
    if (pedidos.length === 0) {
      alert("Não há pedidos pendendes de entrega para gerar relatório.");
      return;
    }

    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;
    const margin = 10;
    let yPos = margin;

    doc.setFontSize(16);
    doc.text("Relatório de Pedidos", pageWidth / 2, yPos, { align: 'center' });
    yPos += 15;

    pedidos.forEach((pedido, index) => {
      if (yPos > pageHeight - 40) {
        doc.addPage();
        yPos = margin;
      }

      doc.setFontSize(14);
      doc.text(`Pedido ${index + 1}`, margin, yPos);
      yPos += 10;

      doc.setFontSize(12);
      pedido.itens.forEach((item) => {
        const itemText = `${item.nome} (${item.quantidade}x) - R$ ${(item.preco * item.quantidade).toFixed(2)}`;
        const splitText = doc.splitTextToSize(itemText, pageWidth - 2 * margin);

        if (yPos + splitText.length * 7 > pageHeight - margin) {
          doc.addPage();
          yPos = margin;
        }

        doc.text(splitText, margin, yPos);
        yPos += splitText.length * 7;
      });

      doc.setFontSize(12);
      doc.text(`Total: R$ ${pedido.total.toFixed(2)}`, margin, yPos);
      yPos += 10;

      const enderecoText = `Endereço: ${pedido.endereco.rua}, ${pedido.endereco.numero}, ${pedido.endereco.bairro}, ${pedido.endereco.cidade}`
      const splitEnderecoText = doc.splitTextToSize(enderecoText, pageWidth - 2 * margin)
      doc.text(splitEnderecoText, margin, yPos)
      yPos += splitEnderecoText.length * 7

      const mapLink = gerarLinkGoogleMaps(pedido.endereco)
      doc.setTextColor(0,0,225)
      doc.textWithLink( 'Abrir no Google Maps', margin, yPos, {url: mapLink})
      doc.setTextColor(0,0,0)
      yPos += 15
    });

    doc.save("relatorio_pedidos.pdf");

  };

  return (
    <div className="relatorios-container">
      <h2>Relatórios</h2>
      <div className="relatorios-buttons">
        <button onClick={gerarRelatorioProdutos} className="botao-relatorio">
          Gerar Relatório de Produtos Disponíveis
        </button>
        <button onClick={gerarRelatorioPedidos} className="botao-relatorio">
          Gerar Relatório de Pedidos Abertos
        </button>
      </div>
    </div>
  );
}

export default Relatorios;