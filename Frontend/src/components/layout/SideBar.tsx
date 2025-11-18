import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {

  const menuItems = [
    { name: "Dashboard", path: "/" },
    { name: "Add Product", path: "/add-product" },
    { name: "Products", path: "/products" },
    // { name: "Purchase", path: "/purchase" },
    { name: "Purchase", path: "/newpurchase" },
    { name: "Stock", path: "/stock" },
    { name: "Sale", path: "/sale" },
    { name: "Sales & Bills", path: "/bill" },
  ];

  return (
    <div className="w-64">
      <div className="p-4 text-xl  ">
        MyApp
      </div>
      <nav className="flex-1 p-4  ">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`block  p-2`}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
