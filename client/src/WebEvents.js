export const WebEvents =[
    {
        id: 1,
        name: "deviceorientation",
        additional: "alpha",
        type: "float",
        minimum: 0,
        maximum: 360,
        callback: "handleOrientationAlpha",
        description: "The motion of the device around the z axis, represented in degrees with values ranging from 0 (inclusive) to 360 (exclusive)."
    },

    {
        id: 2,
        name: "deviceorientation",
        additional: "beta",
        type: "float",
        minimum: -180,
        maximum: 180,
        callback: "handleOrientationBeta",
        description: "The motion of the device around the x axis, represented in degrees with values ranging from -180 (inclusive) to 180 (exclusive). This represents a front to back motion of the device."
    },

    {
        id: 3,
        name: "deviceorientation",
        additional: "gamma",
        type: "float",
        minimum: -90,
        maximum: 90,
        callback: "handleOrientationGamma",
        description: "The motion of the device around the y axis, expressed in degrees with values ranging from -90 (inclusive) to 90 (exclusive). This represents the left to right motion of the device."
    },

    {
        id: 4,
        name: "devicemotion",
        additional: "x",
        type: "float",
        callback: "handleAccelerationX",
        description: "Represents the acceleration upon the x axis which is the west to east axis."
    },

    {
        id: 5,
        name: "devicemotion",
        additional: "y",
        type: "float",
        callback: "handleAccelerationY",
        description: "Represents the acceleration upon the y axis which is the south to north axis."
    },

    {
        id: 6,
        name: "devicemotion",
        additional: "z",
        type: "float",
        callback: "handleAccelerationZ",
        description: "Represents the acceleration upon the z axis which is the down to up axis."
    },

    {
        id: 7,
        name: "deviceshake",
        type: "bang",
        callback: "handleShake",
        description: "Event represents whether the phone has been shaked."
    },
]