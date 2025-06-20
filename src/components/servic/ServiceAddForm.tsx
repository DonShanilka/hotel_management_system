import React, {useEffect, useState} from 'react';
import ServiceTable from './ServiceTable';
import {useDispatch, useSelector} from "react-redux";
import {deleteService, getAllService, saveService, updateService} from "../../reducer/ServiceSlice.ts";

const ServiceAddForm: React.FC = () => {
  const [serviceID, setServiceID] = useState('');
  const [serviceName, setServiceName] = useState('');
  const [servicePrice, setServicePrice] = useState('');
  const [description, setDescription] = useState('');
  const [serviceList, setServiceList] = useState<any[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const dispatch = useDispatch();
  const service = useSelector((state) => state.service || []);

  useEffect(() => {
    dispatch(getAllService());
  }, [dispatch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newService = {
      // serviceID,
      serviceName,
      servicePrice,
      description,
      createdAt: new Date().toISOString(),
    };

    const updateData = {
      serviceID,
      serviceName,
      servicePrice,
      description,
      createdAt: new Date().toISOString(),
    };

    if (editIndex !== null) {
      const updatedList = [];
      updatedList[editIndex] = newService;
      dispatch(updateService(updateData));
      setEditIndex(null);
    } else {
      dispatch(saveService(newService));
    }

    setServiceID('');
    setServiceName('');
    setServicePrice('');
    setDescription('');
  };

  const handleDelete = (serviceId: number) => {
    const isConfirm = window.confirm("Are you sure want to delete Service ?");
    if(isConfirm){
      dispatch(deleteService(serviceId))
    }else{
      alert("Delete Failed, try again!")
    }
  };

  const handleUpdate = (index: number, serviceID : number) => {
    const serviceToUpdate = service?.find((service: any) => service.serviceID === serviceID);

    if (!serviceToUpdate) {
      console.error("Service not found for ID:", serviceID);
      return;
    }
    setServiceID(serviceToUpdate.serviceID);
    setServiceName(serviceToUpdate.serviceName);
    setServicePrice(serviceToUpdate.servicePrice);
    setDescription(serviceToUpdate.description);

    setEditIndex(index);
  };

  return (
    <div className="p-6 bg-white min-h-screen">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">Service Management Form</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* <div>
            <label className="block text-gray-700 font-medium mb-1">Service ID</label>
            <input
              type="text"
              value={serviceID}
              onChange={(e) => setServiceID(e.target.value)}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div> */}

          <div>
            <label className="block text-gray-700 font-medium mb-1">Service Name</label>
            <input
              type="text"
              value={serviceName}
              onChange={(e) => setServiceName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Service Price ($)</label>
            <input
              type="number"
              value={servicePrice}
              onChange={(e) => setServicePrice(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-gray-700 font-medium mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full h-28 p-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className={`mt-4 w-full text-white py-2 rounded-lg transition ${
            editIndex !== null ? "bg-yellow-600 hover:bg-yellow-700" : "bg-blue-700 hover:bg-blue-800"
          }`}
        >
          {editIndex !== null ? "Update Service" : "Add Service"}
        </button>
      </form>

      <ServiceTable services={service} onDelete={handleDelete} onUpdate={handleUpdate} />
    </div>
  );
};

export default ServiceAddForm;
