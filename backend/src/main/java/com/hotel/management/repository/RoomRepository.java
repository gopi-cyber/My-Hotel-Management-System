package com.hotel.management.repository;

import com.hotel.management.model.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RoomRepository extends JpaRepository<Room, Long> {
    Optional<Room> findByRoomNumber(String roomNumber);
    List<Room> findByStatus(String status);
    List<Room> findByType(String type);

    @Query("SELECT r FROM Room r WHERE r.status = 'available' ORDER BY r.pricePerNight ASC")
    List<Room> findAvailableRooms();

    @Query("SELECT COUNT(r) FROM Room r WHERE r.status = :status")
    long countByStatus(String status);
}
