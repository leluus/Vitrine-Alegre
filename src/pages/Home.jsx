import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getProducts, getProductsByCategory, searchProducts, getCategories } from "../services/api";
import ProductCard from "../components/ProductCard";
import ProductCardSkeleton from "../components/ProductCardSkeleton";
import CategoryPills from "../components/CategoryPills";
import SortDropdown from "../components/SortDropdown";
import Pagination from "../components/Pagination";
import "./Home.css";

const PAGE_SIZE = 12;
const CATEGORY_FETCH_LIMIT = 100; // suficiente: nenhuma categoria da DummyJSON passa disso

const SORT_MAP = {
  "preco-asc": { sortBy: "price", order: "asc" },
  "preco-desc": { sortBy: "price", order: "desc" },
  "avaliacao-desc": { sortBy: "rating", order: "desc" },
};

function sortClientSide(products, sortKey) {
  const config = SORT_MAP[sortKey];
  if (!config) return products;

  return [...products].sort((a, b) => {
    const valueA = a[config.sortBy];
    const valueB = b[config.sortBy];
    return config.order === "asc" ? valueA - valueB : valueB - valueA;
  });
}

function Home() {
  const [searchParams, setSearchParams] = useSearchParams();

  const busca = searchParams.get("busca") || "";
  const categoria = searchParams.get("categoria") || "";
  const pagina = Number(searchParams.get("pagina") || "1");
  const sort = searchParams.get("sort") || "";

  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then(setCategories).catch(() => setCategories([]));
  }, []);

  useEffect(() => {
    loadProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [busca, categoria, pagina, sort]);

  async function loadProducts() {
    setIsLoading(true);
    setError(null);
    const skip = (pagina - 1) * PAGE_SIZE;
    const sortParams = SORT_MAP[sort] || {};

    try {
      if (busca.trim() !== "" && categoria !== "") {
        // Busca + categoria juntas: filtra no navegador, já que a API não combina os dois.
        const categoryData = await getProductsByCategory(categoria, { limit: CATEGORY_FETCH_LIMIT, skip: 0 });
        const termo = busca.trim().toLowerCase();

        let matched = categoryData.products.filter(
          (p) => p.title.toLowerCase().includes(termo) || p.description.toLowerCase().includes(termo)
        );

        matched = sortClientSide(matched, sort);

        setTotal(matched.length);
        setProducts(matched.slice(skip, skip + PAGE_SIZE));
      } else if (busca.trim() !== "") {
        const data = await searchProducts(busca, { limit: PAGE_SIZE, skip, ...sortParams });
        setProducts(data.products);
        setTotal(data.total);
      } else if (categoria !== "") {
        const data = await getProductsByCategory(categoria, { limit: PAGE_SIZE, skip, ...sortParams });
        setProducts(data.products);
        setTotal(data.total);
      } else {
        const data = await getProducts({ limit: PAGE_SIZE, skip, ...sortParams });
        setProducts(data.products);
        setTotal(data.total);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  function updateParams(changes) {
    const next = new URLSearchParams(searchParams);
    Object.entries(changes).forEach(([key, value]) => {
      if (value) {
        next.set(key, value);
      } else {
        next.delete(key);
      }
    });
    if (!("pagina" in changes)) {
      next.delete("pagina");
    }
    setSearchParams(next);
  }

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <div className="home">
      <div className="home__toolbar">
        <CategoryPills
          categories={categories}
          selected={categoria}
          onSelect={(slug) => updateParams({ categoria: slug })}
        />
        <SortDropdown value={sort} onChange={(value) => updateParams({ sort: value })} />
      </div>

      {!isLoading && !error && (
        <p className="home__count">
          {total} produto{total !== 1 ? "s" : ""} · página {pagina} de {totalPages}
        </p>
      )}

      {isLoading && (
        <div className="home__grid">
          {Array.from({ length: PAGE_SIZE }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      )}

      {!isLoading && error && (
        <div className="home__status">
          <span className="home__status-icon home__status-icon--error">!</span>
          <h2>Não foi possível carregar os produtos</h2>
          <p>Verifique sua conexão e tente de novo.</p>
          <button className="btn btn--primary" onClick={loadProducts}>Tentar novamente</button>
        </div>
      )}

      {!isLoading && !error && products.length === 0 && (
        <div className="home__status">
          <span className="home__status-icon">🔍</span>
          <h2>Nenhum produto encontrado</h2>
          <p>Tente outro termo ou limpe os filtros.</p>
          {busca ? (
            <button className="btn btn--outline" onClick={() => updateParams({ busca: "" })}>Limpar busca</button>
          ) : (
            <button className="btn btn--outline" onClick={() => updateParams({ categoria: "" })}>Ver todas as categorias</button>
          )}
        </div>
      )}

      {!isLoading && !error && products.length > 0 && (
        <>
          <div className="home__grid">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <Pagination
            currentPage={pagina}
            totalPages={totalPages}
            onPageChange={(page) => updateParams({ pagina: String(page) })}
          />
        </>
      )}
    </div>
  );
}

export default Home;