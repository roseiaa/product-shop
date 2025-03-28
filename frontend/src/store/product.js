import {create} from "zustand";



export const useProductStore = create((set) => ({
    products: [],
    setProducts: (products) => set({products}),
    createProduct: async (newProduct) => {
        if(!newProduct.name || !newProduct.price || !newProduct.description || !newProduct.image){
            return {success: false, msg: "All fields are required"}
            
        }

        const res = await fetch("/api/products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newProduct)
        })

        const data = await res.json()
        set((state) => ({products: [...state.products, data.data]}))
        return {success: true, msg: "Product created successfully"}
        },
    fetchProducts: async () => {
        const res = await fetch("/api/products")
        const data = await res.json()
        set({products: data.data})
    },

    deleteProduct: async (id) => {
        const res = await fetch(`/api/products/${id}`, {
            method: "DELETE" 
        })
        const data = await res.json()
        if (!data.success) return {success: false, msg: data.msg};

        set(state => ({products: state.products.filter((product) => product._id !== id)}))
        return {success: true, msg: "Product deleted successfully"}
    },
    updateProduct: async (id, updatedProduct) => {
        const res = await fetch(`/api/products/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedProduct)
        });
        const data = await res.json();
        if (!data.success) return {success: false, msg: data.msg};
        // Updates the product and refreshes page
        set(state => ({products: state.products.map((product) => product._id === id ? {...product, ...updatedProduct} : product)})) // Loops through existing products and updates the one with the same id
        return {success: true, msg: "Product updated successfully"};
    }
}))

