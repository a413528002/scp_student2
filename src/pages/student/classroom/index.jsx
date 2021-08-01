import React from 'react';
import ClassroomInformation from "@/pages/student/classroom/ClassroomInformation";
import BankInformation from "@/pages/student/classroom/BankInformation";
import TeamMembers from "@/pages/student/classroom/TeamMembers";

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
