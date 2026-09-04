<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>
<%@ taglib prefix="fmt" uri="jakarta.tags.fmt" %>

<jsp:include page="../common/header.jsp" />
<jsp:include page="../common/navbar.jsp" />

<div class="container py-4 flex-grow-1">
    <!-- Welcome Header -->
    <div class="d-flex flex-wrap justify-content-between align-items-center mb-4 pb-3 border-bottom border-secondary border-opacity-25 gap-3">
        <div>
            <h2 class="fw-bold text-white mb-1"><i class="fa-solid fa-crown text-warning me-2"></i>Welcome, ${user.name}</h2>
            <p class="text-secondary mb-0">Manage your reservations, request services, and browse luxury suites.</p>
        </div>
        <div class="d-flex gap-2">
            <a href="${pageContext.request.contextPath}/guest/rooms" class="btn btn-gradient rounded-pill px-3">
                <i class="fa-solid fa-plus me-1"></i> Book New Room
            </a>
            <a href="${pageContext.request.contextPath}/guest/services" class="btn btn-outline-info rounded-pill px-3">
                <i class="fa-solid fa-bell-concierge me-1"></i> Request Service
            </a>
        </div>
    </div>

    <!-- Active Reservations Table -->
    <div class="glass-card p-4 mb-4">
        <div class="d-flex justify-content-between align-items-center mb-3">
            <h5 class="fw-bold text-white mb-0"><i class="fa-solid fa-calendar-check text-primary me-2"></i>My Reservations</h5>
            <span class="badge bg-primary rounded-pill px-3 py-1">${bookings.size()} Bookings</span>
        </div>

        <c:choose>
            <c:when test="${not empty bookings}">
                <div class="table-responsive">
                    <table class="table table-custom mb-0">
                        <thead>
                            <tr>
                                <th>Booking Ref</th>
                                <th>Room</th>
                                <th>Dates</th>
                                <th>Guests</th>
                                <th>Total</th>
                                <th>Status</th>
                                <th>Payment</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <c:forEach var="b" items="${bookings}">
                                <tr>
                                    <td class="fw-bold text-info">${b.bookingReference}</td>
                                    <td>
                                        <div class="fw-semibold text-white">Room ${b.roomNumber}</div>
                                        <div class="text-secondary small">${b.roomType}</div>
                                    </td>
                                    <td>
                                        <div><span class="text-secondary small">In:</span> ${b.checkInDate}</div>
                                        <div><span class="text-secondary small">Out:</span> ${b.checkOutDate} (${b.nights} nights)</div>
                                    </td>
                                    <td>${b.guestsCount}</td>
                                    <td class="fw-bold text-primary">$<fmt:formatNumber value="${b.totalAmount}" pattern="#,##0.00"/></td>
                                    <td>
                                        <span class="badge bg-dark border border-secondary text-white">${b.status}</span>
                                    </td>
                                    <td>
                                        <span class="badge ${b.paymentStatus eq 'PAID' ? 'bg-success' : 'bg-warning text-dark'}">${b.paymentStatus}</span>
                                    </td>
                                    <td>
                                        <a href="${pageContext.request.contextPath}/guest/invoice/${b.id}" class="btn btn-outline-light btn-sm rounded-pill px-3">
                                            <i class="fa-solid fa-file-invoice me-1"></i> Invoice
                                        </a>
                                    </td>
                                </tr>
                            </c:forEach>
                        </tbody>
                    </table>
                </div>
            </c:when>
            <c:otherwise>
                <div class="text-center py-4 text-secondary">
                    <i class="fa-solid fa-calendar-xmark fs-2 mb-2 d-block"></i>
                    No active reservations found. <a href="${pageContext.request.contextPath}/guest/rooms" class="text-info">Browse available rooms</a>.
                </div>
            </c:otherwise>
        </c:choose>
    </div>

    <!-- Available Rooms Quick View -->
    <div class="glass-card p-4">
        <h5 class="fw-bold text-white mb-3"><i class="fa-solid fa-sparkles text-warning me-2"></i>Available Suites to Book</h5>
        <div class="row g-3">
            <c:forEach var="r" items="${availableRooms}">
                <div class="col-md-4">
                    <div class="card bg-dark border border-secondary border-opacity-50 text-white rounded-3 overflow-hidden h-100">
                        <img src="${r.imageUrl}" class="card-img-top" alt="${r.name}" style="height: 160px; object-fit: cover;">
                        <div class="p-3 d-flex flex-column flex-grow-1">
                            <div class="d-flex justify-content-between align-items-center mb-1">
                                <h6 class="fw-bold mb-0">${r.name}</h6>
                                <span class="badge bg-primary text-white">Room ${r.roomNumber}</span>
                            </div>
                            <p class="text-secondary small mb-2">${r.type} &bull; Up to ${r.capacity} Guests</p>
                            <div class="d-flex justify-content-between align-items-center mt-auto pt-2 border-top border-secondary border-opacity-25">
                                <span class="fw-bold text-primary fs-5">$<fmt:formatNumber value="${r.pricePerNight}" pattern="#,##0.00"/>/nt</span>
                                <a href="${pageContext.request.contextPath}/guest/rooms" class="btn btn-gradient btn-sm rounded-pill px-3">Book</a>
                            </div>
                        </div>
                    </div>
                </div>
            </c:forEach>
        </div>
    </div>
</div>

<jsp:include page="../common/footer.jsp" />
