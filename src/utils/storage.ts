interface Hotel {
    id: string;
    name: string;
    city: string;
    enabled: boolean;
  }
  
  interface Room {
    id: string;
    hotelId: string;
    type: string;
    baseCost: number;
    taxes: number;
    enabled: boolean;
  }
  
  interface Reservation {
    id: string;
    roomId: string;
    guest: {
      firstName: string;
      lastName: string;
      dob: string;
      gender: string;
      documentType: string;
      documentNumber: string;
      email: string;
      phone: string;
    };
    emergencyContact: {
      fullName: string;
      phone: string;
    };
    checkIn: string;
    checkOut: string;
  }
  
  // Obtener hoteles
  export const getHotels = (): Hotel[] => {
    return JSON.parse(localStorage.getItem("hotels") || "[]");
  };
  
  // Guardar un nuevo hotel
  export const saveHotel = (hotel: Hotel) => {
    const hotels = getHotels();
    hotels.push(hotel);
    localStorage.setItem("hotels", JSON.stringify(hotels));
  };
  
  // Obtener habitaciones
  export const getRooms = (): Room[] => {
    return JSON.parse(localStorage.getItem("rooms") || "[]");
  };
  
  // Guardar una nueva habitación
  export const saveRoom = (room: Room) => {
    const rooms = getRooms();
    rooms.push(room);
    localStorage.setItem("rooms", JSON.stringify(rooms));
  };
  
  // Obtener reservas
  export const getReservations = (): Reservation[] => {
    const storedData = localStorage.getItem("reservations");
    return storedData ? JSON.parse(storedData) : [];
  };
  
  
  // Guardar una nueva reserva
  export const saveReservation = (reservation: Reservation) => {
    const reservations = getReservations();
    reservations.push(reservation);
    localStorage.setItem("reservations", JSON.stringify(reservations));
  };
  
  // Obtener habitaciones por hotel
  export const getRoomsByHotel = (hotelId: string): Room[] => {
    const rooms = getRooms();
    return rooms.filter((room) => room.hotelId === hotelId);
  };
  
  // Habilitar/deshabilitar un hotel
  export const toggleHotelStatus = (hotelId: string, enabled: boolean) => {
    const hotels = getHotels();
    const updatedHotels = hotels.map((hotel) =>
      hotel.id === hotelId ? { ...hotel, enabled } : hotel
    );
    localStorage.setItem("hotels", JSON.stringify(updatedHotels));
  };
  
  // Habilitar/deshabilitar una habitación
  export const toggleRoomStatus = (roomId: string, enabled: boolean) => {
    const rooms = getRooms();
    const updatedRooms = rooms.map((room) =>
      room.id === roomId ? { ...room, enabled } : room
    );
    localStorage.setItem("rooms", JSON.stringify(updatedRooms));
  };
  
  // Eliminar un hotel
  export const deleteHotel = (id: string) => {
    const hotels = getHotels();
    const rooms = getRooms();
  
    const hasAssociatedRooms = rooms.some((room) => room.hotelId === id);
  
    if (hasAssociatedRooms) {
      alert("No se puede eliminar el hotel porque tiene habitaciones asociadas.");
      return;
    }
  
    const confirmDelete = window.confirm("¿Estás seguro de que quieres eliminar este hotel?");
    if (!confirmDelete) return;
  
    const updatedHotels = hotels.filter((hotel) => hotel.id !== id);
    localStorage.setItem("hotels", JSON.stringify(updatedHotels));
    alert("Hotel eliminado exitosamente.");
  };
  
  // Eliminar una habitación
  export const deleteRoom = (id: string) => {
    const confirmDelete = window.confirm("¿Estás seguro de que quieres eliminar esta habitación?");
    if (!confirmDelete) return;
  
    const rooms = getRooms();
    const updatedRooms = rooms.filter((room) => room.id !== id);
    localStorage.setItem("rooms", JSON.stringify(updatedRooms));
    alert("Habitación eliminada exitosamente.");
  };
  