
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import  Home  from '../src/components/Home/homepage';
import SuperAdminSignUp from '../src/components/SuperAdmin/SuperAdminSignUp';
import SuperAdminLogin from '../src/components/SuperAdmin/SuperAdminLogin';
import SuperAdminDashboard from './components/SuperAdminDashBoard/superAdminDashBoard';
import AddCompany from './components/Company/addCompany';
import CompanyList from './components/Company/companyList';
import UpdateCompany from './components/Company/updateCompany';
import ListProperties from './components/Property/ListProperties';
import AddProperty from './components/Property/AddProperty';
import UpdateProperty from './components/Property/UpdateProperty';
import AddTenant from './components/Tenant/AddTenant';
import UpdateTenant from './components/Tenant/UpdateTenant';
import TenantList from './components/Tenant/TenantList';
import PersonList from './components/Person/PersonList';
import AddPerson from './components/Person/AddPerson';
import UpdatePerson from './components/Person/UpdatePerson';
import TenantPage from './components/TenantService/TenantPage';
import ExpensePage from './components/TenantService/ExpensePage';
import ComplaintsPage from './components/Person/ComplaintsPage';
import ResolveComplaint from './components/Person/ResolveComplaint';
import Transaction from './components/Transaction/Transaction';
import PersonLogin from './components/Person/PersonLogin';
import AdminLogin from './components/Admin/AdminLogin';
import AdminSignUp from './components/Admin/AdminSignUp';


function App() {
  return (
    
    <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/" element={<SuperAdminLogin />} />

        <Route path="/super-admin/signup" element={<SuperAdminSignUp />} />
        <Route path="/super-admin/signin" element={<SuperAdminLogin />} />


        <Route path="/admin/signup" element={<AdminSignUp />} />
        <Route path="/admin/signin" element={<AdminLogin />} />


        <Route path="/super-admin/dashboard" element={<SuperAdminDashboard />} />
        <Route path="/create-company" element={<AddCompany />} />
        <Route path="/get-companies" element={<CompanyList />} />
        <Route path="/update-company/:id" element={<UpdateCompany />} />

        <Route path="/get-properties" element={<ListProperties />} />
        <Route path="/create-property" element={<AddProperty />} />
        <Route path="/update-property/:id" element={<UpdateProperty />} />

   
        <Route path="/tenant" element={<TenantPage />} />
        <Route path="/get-tenants" element={<TenantList/>} />
        <Route path="/add-tenant" element={<AddTenant/>} />
        <Route path="/update-tenant/:id" element={<UpdateTenant/>} />
     
        <Route path="/expense" element={<ExpensePage />} />

        <Route path="/person/login" element={<PersonLogin />} />
        <Route path="/company/:companyId/persons" element={<PersonList />} />
        <Route path="/add-person/:companyId" element={<AddPerson />} />
        <Route path="/update-person/:personId" element={<UpdatePerson />} />
        <Route path="/complaints" element={<ComplaintsPage />} />
        <Route path="/resolve-complaint" element={<ResolveComplaint />} />

        <Route path="/transactions" element={<Transaction />} />


    </Routes>
  
  );
}

export default App;
