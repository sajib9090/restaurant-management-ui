const MenuItemTableHead = () => {
  return (
    <thead className="block md:table-header-group">
      <tr className="border border-gray-100 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto md:relative">
        <th className="p-2 text-gray-600 font-bold md:border md:border-gray-200 text-left block md:table-cell"></th>
        <th className="p-2 text-gray-600 font-bold md:border md:border-gray-200 text-center block md:table-cell">
          Discount
        </th>
        <th className="p-2 text-gray-600 font-bold md:border md:border-gray-200 text-center block md:table-cell">
          Date
        </th>
        <th className="p-2 text-gray-600 font-bold md:border md:border-gray-200 text-center block md:table-cell">
          Price
        </th>
        <th className="p-2 text-gray-600 font-bold md:border md:border-gray-200 text-center block md:table-cell">
          Action
        </th>
      </tr>
    </thead>
  );
};

export default MenuItemTableHead;
