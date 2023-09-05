import { useAuth0 } from '@auth0/auth0-react';
import { Container, Modal, Stepper } from '@mantine/core'
import React, {useState} from 'react'
import AddLocation from '../AddLocation/AddLocation';
import BasicDetails from '../BasicDetails/BasicDetails';
import Facilities from '../Facilities/Facilities';
import UploadImage from '../UploadImage/UploadImage';

const AddPropertyModal = ({opened, setOpened}) => {

    const [active, setActive] = useState(0);
    const { user } = useAuth0();

    const [propertyDetails, setPropertyDetails] = useState({
        title: "",
        description: "", 
        price: 0,
        country: "",
        city: "",
        address: "",
        image: null,
        facilities: {
            bedrooms: 0,
            parkings: 0,
            bathroom: 0
        },
        userEmail: user?.email
    })

    const nextStep = () => {
        setActive((current) => (current < 4 ? current + 1 : current));
    }

    const prevStep = () => {
        setActive((current) => (current > 0 ? current - 1 : current));
    }

  return (
    <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        closeOnClickOutside
        size={"90rem"}
    >   
        <Container h={"40rem"} w={"100%"}>
        <Stepper active={active} onStepClick={setActive} breakpoint="sm">
            <Stepper.Step label="Location" description="Address">
                <AddLocation 
                    nextStep={nextStep}
                    propertyDetails={propertyDetails}
                    setPropertyDetails={setPropertyDetails}
                />
            </Stepper.Step>
            <Stepper.Step label="Image" description="Upload Image">
                <UploadImage 
                    nextStep={nextStep}
                    prevStep={prevStep}
                    propertyDetails={propertyDetails}
                    setPropertyDetails={setPropertyDetails}
                />
            </Stepper.Step>
            <Stepper.Step label="Basic" description="Details">
              <BasicDetails 
                nextStep={nextStep}
                prevStep={prevStep}
                propertyDetails={propertyDetails}
                setPropertyDetails={setPropertyDetails}
              />
            </Stepper.Step>
            <Stepper.Step>
                <Facilities 
                    prevStep={prevStep}
                    propertyDetails={propertyDetails}
                    setPropertyDetails={setPropertyDetails}
                    setOpened={setOpened}
                    setActiveStep={setActive}
                />
            </Stepper.Step>
            <Stepper.Completed>
            Completed, click back button to get to previous step
            </Stepper.Completed>
        </Stepper>
        </Container>

    </Modal>
  )
}

export default AddPropertyModal
