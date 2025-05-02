// 主應用組件
function App() {
    return (
        <div>
            <Header />
            <MapContainer />
        </div>
    );
}

// 頁首組件
function Header() {
    return (
        <div className="header">
            <h1>媽祖遶境即時追蹤系統</h1>
            <p>即時追蹤媽祖遶境隊伍的位置</p>
        </div>
    );
}

// 地圖容器組件
function MapContainer() {
    const mapRef = React.useRef(null);
    const [map, setMap] = React.useState(null);
    const [marker, setMarker] = React.useState(null);

    React.useEffect(() => {
        // 確保 DOM 元素已經存在
        if (!mapRef.current) {
            return;
        }

        // 檢查地圖是否已經初始化
        if (map) {
            return;
        }

        try {
            // 初始化地圖
            const newMap = L.map(mapRef.current).setView([23.5, 120.5], 8);

            // 使用 Wikimedia 的地圖圖層
            L.tileLayer('https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png', {
                maxZoom: 18,
                attribution: '© OpenStreetMap contributors'
            }).addTo(newMap);

            // 添加標記
            const newMarker = L.marker([23.5, 120.5]).addTo(newMap);

            setMap(newMap);
            setMarker(newMarker);

            // 模擬位置更新
            const interval = setInterval(() => {
                const lat = 23.5 + (Math.random() - 0.5) * 0.1;
                const lng = 120.5 + (Math.random() - 0.5) * 0.1;
                newMarker.setLatLng([lat, lng]);
                newMap.setView([lat, lng]);
            }, 5000);

            // 清理函數
            return () => {
                clearInterval(interval);
                if (newMap) {
                    newMap.remove();
                }
            };
        } catch (error) {
            console.error('Error initializing map:', error);
        }
    }, [map]); // 依賴於 map 狀態

    return <div ref={mapRef} className="map-container" />;
}

// 渲染應用
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />); 