import React from 'react';
import OrganizationTable from "@/pages/student/plan/organization/OrganizationTable";
import {Card} from "antd";
import OrganizationBackMap from "@/pages/student/plan/organization/OrganizationBankMap";

const TacticOrganization = () => {
  return (
    <Card>
      <OrganizationTable/>
      <OrganizationBackMap/>
    </Card>
  );
};

export default TacticOrganization;
