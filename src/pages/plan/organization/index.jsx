import React from 'react';
import OrganizationTable from "@/pages/plan/organization/OrganizationTable";
import {Card} from "antd";
import OrganizationBackMap from "@/pages/plan/organization/OrganizationBankMap";

const TacticOrganization = () => {
  return (
    <Card>
      <OrganizationTable/>
      <OrganizationBackMap/>
    </Card>
  );
};

export default TacticOrganization;
