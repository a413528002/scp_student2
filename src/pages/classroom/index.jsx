import React from 'react';
import ClassroomInformation from "@/pages/classroom/ClassroomInformation";
import BankInformation from "@/pages/classroom/BankInformation";
import TeamMembers from "@/pages/classroom/TeamMembers";

const Classroom = () => {
  return (
    <>
      <ClassroomInformation/>
      <BankInformation/>
      <TeamMembers/>
    </>
  );
};

export default Classroom;
