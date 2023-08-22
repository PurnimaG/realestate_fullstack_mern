import asyncHandler from 'express-async-handler';
import {prisma} from '../config/prismaConfig.js';


//Create new Residency listing
export const createResidency = asyncHandler(async(req, res ) => {
    const { title, description, price, address, country, city, facilities, image, userEmail} = req.body.data;

    console.log(req.body.data);

    try{

        //create data into database
        const residency = await prisma.residency.create({
            data: {
                title, description, price, address, country, city, facilities, image, owner: { connect: { email: userEmail}}
            }
        });

        res.send({message: "Residency created successfully", residency});

    }catch (err) {
        if(err.code === "P2002") {
            throw new Error("A residency with this address is already exists");
        }
        throw new Error (err.message);
    }
});


// Get all the residencies
export const getAllResidency = asyncHandler(async(req, res) => {
    const residencies = await prisma.residency.findMany({
        orderBy: {
            createdAt: "desc"
        }
    })

    res.send(residencies);
})

//Get Residency by ID
export const getResidencyById = asyncHandler(async(req, res) => { 
    //Assume that residency id send via url
    const { id } = req.params;
    
    try {

        const residency = await prisma.residency.findUnique({
            where: {id}
        })
        res.send(residency);
    } catch (err) {
        throw new Error(err.message);
    }
});