<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>
<%@ taglib prefix="fmt" uri="jakarta.tags.fmt" %>

<jsp:include page="../common/header.jsp" />
<jsp:include page="../common/navbar.jsp" />

<div class="container py-4 flex-grow-1">
    <div class="d-flex justify-content-between align-items-center mb-4 pb-2 border-bottom border-secondary border-opacity-25">
        <div>
            <h2 class="fw-bold text-white mb-1"><i class="fa-solid fa-hotel text-primary me-2"></i>Explore Luxury Rooms & Suites</h2>
            <p class="text-secondary mb-0">Select your dates and book directly with real-time MySQL persistence.</p>
        </div>
    </div>

    <div class="row g-4">
        <c:forEach var="room" items="${rooms}">
            <div class="col-md-6 col-lg-4">
                <div class="glass-card h-100 overflow-hidden d-flex flex-column">
                    <div class="position-relative">
                        <img src="${room.imageUrl}" class="card-img-top" alt="${room.name}" style="height: 220px; object-fit: cover;">
                        <span class="position-absolute top-0 end-0 m-3 badge badge-status-${room.status}">${room.status}</span>
                        <span class="position-absolute bottom-0 start-0 m-3 badge bg-dark bg-opacity-75 text-info border border-secondary">
                            Room ${room.roomNumber}
                        </span>
                    </div>

                    <div class="p-4 d-flex flex-column flex-grow-1">
                        <div class="d-flex justify-content-between align-items-center mb-2">
                            <h5 class="fw-bold text-white mb-0">${room.name}</h5>
                        </div>
                        <p class="text-info small fw-semibold mb-2">${room.type} &bull; Capacity: ${room.capacity} Guests</p>
                        <p class="text-secondary small mb-3">${room.description}</p>
                        
                        <div class="mb-3">
                            <span class="text-secondary small d-block mb-1">Amenities:</span>
                            <div class="d-flex flex-wrap gap-1">
                                <c:forEach var="amenity" items="${room.amenities.split(',')}">
                                    <span class="badge bg-dark border border-secondary text-secondary small">${amenity.trim()}</span>
                                </c:forEach>
                            </div>
                        </div>

                        <div class="d-flex align-items-center justify-content-between pt-3 border-top border-secondary border-opacity-25 mt-auto">
                            <div>
                                <span class="fs-4 fw-bold text-primary">$<fmt:formatNumber value="${room.pricePerNight}" pattern="#,##0.00"/></span>
                                <span class="text-secondary small"> / night</span>
                            </div>
                            
                            <c:choose>
                                <c:when test="${room.status eq 'available'}">
                                    <button class="btn btn-gradient btn-sm rounded-pill px-3" 
                                            onclick="openBookModal('${room.id}', '${room.name}', '${room.roomNumber}', '${room.pricePerNight}')">
                                        <i class="fa-solid fa-calendar-plus me-1"></i> Book Now
                                    </button>
                                </c:when>
                                <c:otherwise>
                                    <button class="btn btn-secondary btn-sm rounded-pill px-3" disabled>Unavailable</button>
                                </c:otherwise>
                            </c:choose>
                        </div>
                    </div>
                </div>
            </div>
        </c:forEach>
    </div>
</div>

<!-- Booking Modal -->
<div class="modal fade" id="bookModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content glass-card text-white border border-secondary">
            <div class="modal-header border-secondary border-opacity-25">
                <h5 class="modal-title fw-bold"><i class="fa-solid fa-calendar-check text-primary me-2"></i>Book <span id="modalRoomName"></span></h5>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
            </div>
            <form action="${pageContext.request.contextPath}/guest/book" method="POST">
                <div class="modal-body">
                    <input type="hidden" name="roomId" id="modalRoomId">
                    <p class="text-info small mb-3">Room #<span id="modalRoomNumber"></span> &bull; Rate: $<span id="modalRoomPrice"></span> / night</p>

                    <div class="row g-3">
                        <div class="col-md-6">
                            <label class="form-label text-secondary small fw-semibold">Check-In Date</label>
                            <input type="date" name="checkInDate" id="checkInDate" class="form-control form-control-custom" required>
                        </div>
                        <div class="col-md-6">
                            <label class="form-label text-secondary small fw-semibold">Check-Out Date</label>
                            <input type="date" name="checkOutDate" id="checkOutDate" class="form-control form-control-custom" required>
                        </div>
                        <div class="col-md-12">
                            <label class="form-label text-secondary small fw-semibold">Number of Guests</label>
                            <input type="number" name="guestsCount" class="form-control form-control-custom" value="1" min="1" max="6" required>
                        </div>
                        <div class="col-12">
                            <label class="form-label text-secondary small fw-semibold">Special Requests (Optional)</label>
                            <textarea name="specialRequests" class="form-control form-control-custom" rows="2" placeholder="e.g. Early check-in, extra towels, high floor"></textarea>
                        </div>
                    </div>
                </div>
                <div class="modal-footer border-secondary border-opacity-25">
                    <button type="button" class="btn btn-outline-light rounded-pill" data-bs-dismiss="modal">Cancel</button>
                    <button type="submit" class="btn btn-gradient rounded-pill px-4">Confirm & Pay</button>
                </div>
            </form>
        </div>
    </div>
</div>

<script>
function openBookModal(id, name, roomNo, price) {
    <c:if test="${empty sessionScope.currentUser}">
        window.location.href = '${pageContext.request.contextPath}/login';
        return;
    </c:if>
    document.getElementById('modalRoomId').value = id;
    document.getElementById('modalRoomName').innerText = name;
    document.getElementById('modalRoomNumber').innerText = roomNo;
    document.getElementById('modalRoomPrice').innerText = price;
    
    // Set default dates (today & 2 days later)
    const today = new Date().toISOString().split('T')[0];
    const nextDate = new Date();
    nextDate.setDate(nextDate.getDate() + 2);
    const twoDays = nextDate.toISOString().split('T')[0];
    
    document.getElementById('checkInDate').value = today;
    document.getElementById('checkOutDate').value = twoDays;

    new bootstrap.Modal(document.getElementById('bookModal')).show();
}
</script>

<jsp:include page="../common/footer.jsp" />
