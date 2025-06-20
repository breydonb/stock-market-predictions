// place files you want to import through the `$lib` alias in this folder.
export const SPRING_API_URL = import.meta.env.VITE_SPRING_BOOT_BASE_URL || "http://localhost:8443/api/stock_data"
export const ML_API_URL = import.meta.env.VITE_ML_BASE_URL || "http://localhost:8000/predict"