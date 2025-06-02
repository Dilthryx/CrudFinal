import { useEffect, useState } from 'react';
import axios from 'axios';

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
};

export function ProductManager() {
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState<Omit<Product, 'id'>>({
    name: '',
    description: '',
    price: 0,
    stock: 0,
    imageUrl: '',
  });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [error, setError] = useState('');

  const fetchProducts = async () => {
    try {
      const res = await axios.get('/api/products/read');
      setProducts(res.data);
    } catch {
      setError('Error al obtener productos');
    }
  };

  const clearForm = () => {
    setForm({ name: '', description: '', price: 0, stock: 0, imageUrl: '' });
    setEditingId(null);
    setError('');
  };

  const handleSubmit = async () => {
    if (!form.name || !form.description || form.price <= 0 || form.stock < 0) {
      setError('Por favor completa todos los campos correctamente.');
      return;
    }

    try {
      if (editingId === null) {
        await axios.post('/api/products/create', form);
      } else {
        await axios.put('/api/products/update', { id: editingId, ...form });
      }
      clearForm();
      fetchProducts();
    } catch {
      setError('Error al guardar el producto');
    }
  };

  const handleEdit = (product: Product) => {
    setForm({
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      imageUrl: product.imageUrl,
    });
    setEditingId(product.id);
    setError('');
  };

  const deleteProduct = async (id: number) => {
    try {
      await axios.delete('/api/products/delete', { data: { id } });
      if (editingId === id) clearForm();
      fetchProducts();
    } catch {
      setError('Error al eliminar producto');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-indigo-600">Mi Tienda Online</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10">
        <h2 className="text-xl font-semibold text-gray-700 mb-6">
          {editingId ? 'Editar producto' : 'Agregar nuevo producto'}
        </h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 bg-white p-6 rounded-lg shadow">
          <input
            className="border px-4 py-2 rounded"
            placeholder="Nombre"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            className="border px-4 py-2 rounded"
            placeholder="Descripción"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
          <input
            className="border px-4 py-2 rounded"
            placeholder="Precio"
            type="number"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: parseFloat(e.target.value) })}
          />
          <input
            className="border px-4 py-2 rounded"
            placeholder="Stock"
            type="number"
            value={form.stock}
            onChange={(e) => setForm({ ...form, stock: parseInt(e.target.value) })}
          />
          <input
            className="border px-4 py-2 rounded col-span-1 md:col-span-2"
            placeholder="URL de imagen"
            value={form.imageUrl}
            onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
          />
          <div className="flex gap-4 col-span-1 md:col-span-2">
            <button
              onClick={handleSubmit}
              className={`${
                editingId ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-indigo-600 hover:bg-indigo-700'
              } text-white py-2 px-4 rounded transition`}
            >
              {editingId ? 'Actualizar producto' : 'Agregar producto'}
            </button>
            {editingId !== null && (
              <button
                onClick={clearForm}
                className="py-2 px-4 rounded border border-gray-400 hover:bg-gray-100 transition"
              >
                Cancelar
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p) => (
            <div key={p.id} className="bg-white p-4 rounded-lg shadow hover:shadow-md transition">
              <img
                src={p.imageUrl}
                alt={p.name}
                className="w-full h-40 object-cover rounded mb-3"
              />
              <h3 className="text-lg font-bold text-gray-800">{p.name}</h3>
              <p className="text-gray-600 text-sm mb-1">{p.description}</p>
              <p className="font-semibold text-indigo-600 mb-1">${p.price.toFixed(2)}</p>
              <p className="text-sm text-gray-500">Stock: {p.stock}</p>
              <div className="mt-3 flex gap-2">
                <button
                  onClick={() => handleEdit(p)}
                  className="w-full bg-yellow-400 text-white py-1 rounded hover:bg-yellow-500 transition"
                >
                  Editar
                </button>
                <button
                  onClick={() => deleteProduct(p.id)}
                  className="w-full bg-red-500 text-white py-1 rounded hover:bg-red-600 transition"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
