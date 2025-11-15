import { useState } from 'react';

export function useBibleReference() {
  const [isLoading, setIsLoading] = useState(false);
  const [bibleText, setBibleText] = useState<string | null>(null);

  const fetchBibleText = async (reference: string): Promise<string> => {
    setIsLoading(true);
    try {
      // Simula busca do texto bíblico
      // TODO: Implementar busca real da API ou arquivo leitura.html
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Por enquanto retorna texto placeholder
      setBibleText(`"Texto da referência ${reference} será carregado aqui."`);
      return `"Texto da referência ${reference} será carregado aqui."`;
    } catch (error) {
      console.error('Erro ao buscar texto bíblico:', error);
      setBibleText('Erro ao carregar o texto bíblico.');
      return 'Erro ao carregar o texto bíblico.';
    } finally {
      setIsLoading(false);
    }
  };

  const clearBibleText = () => {
    setBibleText(null);
  };

  return { fetchBibleText, bibleText, isLoading, clearBibleText };
}
