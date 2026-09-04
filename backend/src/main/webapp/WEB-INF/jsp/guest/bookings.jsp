<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>
<%@ taglib prefix="fmt" uri="jakarta.tags.fmt" %>

<jsp:include page="../common/header.jsp" />
<jsp:include page="../common/navbar.jsp" />

<div class="container py-4 flex-grow-1">
    <div class="d-flex justify-content-between align-items-center mb-4 pb-2 border-bottom border-secondary border-opacity-25">
        <div>
            <h2 class="fw-bold text-white mb-1"><i class="fa-solid fa-book-bookmark text-primary me-2"></i>My Booking History</h2>
            <p class="text-secondary mb-0">Review all your past and upcoming reservations with invoice access.</p>
        </div>
        <a href="${pageContext.request.contextPath}/guest/rooms" class="btn btn-gradient rounded-pill px-3">
            <i class="fa-solid fa-plus me-1"></i> New Booking
        </a>
    </div>

    <div class="glass-card p-4">
        <c:choose>
            <c:when test="${not empty bookings}">
                <div class="table-responsive">
                    <table class="table table-custom mb-0">
                        <thead>
                            <tr>
                                <th>Booking Reference</th>
                                <th>Room Info</th>
                                <th>Check-In / Out</th>
                                <th>Duration</th>
                                <th>Guests</th>
                                <th>Total Cost</th>
                                <th>Status</th>
                                <th>Payment</th>
                                <th>Actions</th>
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
                                        <div><span class="text-secondary small">Out:</span> ${b.checkOutDate}</div>
                                    </td>
                                    <td>${b.nights} nights</td>
                                    <td>${b.guestsCount}</td>
                                    <td class="fw-bold text-primary">$<fmt:formatNumber value="${b.totalAmount}" pattern="#,##0.00"/></td>
                                    <td><span class="badge bg-dark border border-secondary text-white">${b.status}</span></td>
                                    <td><span class="badge ${b.paymentStatus eq 'PAID' ? 'bg-success' : 'bg-warning text-dark'}">${b.paymentStatus}</span></td>
                                    <td>
                                        <a href="${pageContext.request.contextPath}/guest/invoice/${b.id}" class="btn btn-outline-info btn-sm rounded-pill px-3">
                                            <i class="fa-solid fa-file-invoice me-1"></i> View Invoice
                                        </a>
                                    </td>
                                </tr>
                            </c:forEach>
                        </tbody>
                    </table>
                </div>
            </c:when>
            <c:otherwise>
                <div class="text-center py-5 text-secondary">
                    <i class="fa-solid fa-folder-open fs-1 mb-3 text-secondary d-block"></i>
                    You have not made any bookings yet.
                    <div class="mt-3">
                        <a href="${pageContext.request.contextPath}/guest/rooms" class="btn btn-gradient rounded-pill px-4">Browse Rooms</a>
                    </div>
                </div>
            </c:otherwise>
        </c:choose>
    </div>
</div>

<jsp:include page="../common/footer.jsp" />
