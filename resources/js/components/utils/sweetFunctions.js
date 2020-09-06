export const isEmpty = obj => {
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) return false;
    }
    return true;
};

// if (avatar == undefined) {
//     const config = {
//         header: {
//             Accept: "application/json",
//             "Content-Type": "multipart/form-data"
//         }
//     };
//     const prof = new FormData();
//     prof.append("avatar", avatar);

//     axios
//         .post(`/api/profiles/${user.id}/upload_image`, prof, config)
//         .then(res => console.log(res))
//         .catch(err => console.error(err));
// }
