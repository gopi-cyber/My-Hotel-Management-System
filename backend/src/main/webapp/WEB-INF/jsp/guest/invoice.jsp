<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>
<%@ taglib prefix="fmt" uri="jakarta.tags.fmt" %>

<jsp:include page="../common/header.jsp" />
<jsp:include page="../common/navbar.jsp" />

<div class="container py-4 flex-grow-1">
    <div class="d-flex justify-content-between align-items-center mb-4 pb-2 border-bottom border-secondary border-opacity-25">
        <div>
            <h2 class="fw-bold text-white mb-1"><i class="fa-solid fa-receipt text-primary me-2"></i>Official Booking Invoice</h2>
            <p class="text-secondary mb-0">Booking Reference: <span class="text-info fw-bold">${booking.bookingReference}</span></p>
        </div>
        <div class="d-flex gap-2">
            <button onclick="window.print()" class="btn btn-outline-light rounded-pill px-3">
                <i class="fa-solid fa-print me-1"></i> Print Invoice
            </button>
            <a href="${pageContext.request.contextPath}/guest/bookings" class="btn btn-gradient rounded-pill px-3">
                <i class="fa-solid fa-arrow-left me-1"></i> Back to Bookings
            </a>
        </div>
    </div>

    <div class="row justify-content-center">
        <div class="col-lg-10">
            <div class="glass-card p-5" id="printableInvoice">
                <!-- Invoice Header -->
                <div class="d-flex justify-content-between align-items-start pb-4 mb-4 border-bottom border-secondary border-opacity-25">
                    <div>
                        <h3 class="fw-bold text-primary mb-1"><i class="fa-solid fa-hotel me-2"></i>LuxeStay Grand Hotel</h3>
                        <p class="text-secondary small mb-0">100 Luxury Boulevard, Suite 500<br>Metropolis, NY 10001<br>contact@luxestay.com &bull; +1 (800) 555-LUXE</p>
                    </div>
                    <div class="text-end">
                        <span class="badge bg-success fs-6 px-3 py-2 rounded-pill mb-2">${booking.paymentStatus}</span>
                        <div class="text-secondary small">Invoice Date: <strong>${booking.createdAt}</strong></div>
                        <div class="text-secondary small">Ref: <strong>${booking.bookingReference}</strong></div>
                    </div>
                </div>

                <!-- Guest & Stay Details -->
                <div class="row g-4 mb-4">
                    <div class="col-md-6">
                        <h6 class="text-secondary text-uppercase fw-bold small mb-2">Billed To:</h6>
                        <h5 class="fw-bold text-white mb-1">${booking.guestName}</h5>
                        <p class="text-secondary small mb-0">
                            Email: ${booking.guestEmail}<br>
                            Phone: ${booking.guestPhone != null ? booking.guestPhone : 'N/A'}
                        </p>
                    </div>
                    <div class="col-md-6 text-md-end">
                        <h6 class="text-secondary text-uppercase fw-bold small mb-2">Reservation Details:</h6>
                        <p class="text-white small mb-0">
                            <strong>Room:</strong> Room ${booking.roomNumber} (${booking.roomType})<br>
                            <strong>Check-In:</strong> ${booking.checkInDate}<br>
                            <strong>Check-Out:</strong> ${booking.checkOutDate}<br>
                            <strong>Duration:</strong> ${booking.nights} Night(s) &bull; ${booking.guestsCount} Guest(s)
                        </p>
                    </div>
                </div>

                <!-- Line Items Table -->
                <div class="table-responsive mb-4">
                    <table class="table table-custom">
                        <thead>
                            <tr>
                                <th>Item Description</th>
                                <th class="text-center">Rate / Night</th>
                                <th class="text-center">Nights</th>
                                <th class="text-end">Total Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <div class="fw-bold text-white">${booking.roomType} Accommodation</div>
                                    <div class="text-secondary small">Room ${booking.roomNumber} - Luxury Amenities & WiFi included</div>
                                </td>
                                <td class="text-center">$<fmt:formatNumber value="${booking.room.pricePerNight}" pattern="#,##0.00"/></td>
                                <td class="text-center">${booking.nights}</td>
                                <td class="text-end fw-bold text-primary">$<fmt:formatNumber value="${booking.totalAmount}" pattern="#,##0.00"/></td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <th colspan="3" class="text-end text-secondary">Subtotal:</th>
                                <th class="text-end text-white">$<fmt:formatNumber value="${booking.totalAmount}" pattern="#,##0.00"/></th>
                            </tr>
                            <tr>
                                <th colspan="3" class="text-end text-secondary">Taxes & Resort Fees (Included):</th>
                                <th class="text-end text-white">$0.00</th>
                            </tr>
                            <tr>
                                <th colspan="3" class="text-end fs-5 text-white">Grand Total:</th>
                                <th class="text-end fs-5 fw-bold text-primary">$<fmt:formatNumber value="${booking.totalAmount}" pattern="#,##0.00"/></th>
                            </tr>
                        </tfoot>
                    </table>
                </div>

                <!-- Special Requests & Footer -->
                <c:if test="${not empty booking.specialRequests}">
                    <div class="bg-dark bg-opacity-50 p-3 rounded-3 mb-4 border border-secondary border-opacity-25">
                        <h6 class="text-secondary small fw-bold mb-1">Special Requests:</h6>
                        <p class="text-white small mb-0">${booking.specialRequests}</p>
                    </div>
                </c:if>

                <div class="text-center pt-3 border-top border-secondary border-opacity-25 text-secondary small">
                    Thank you for staying at LuxeStay! We look forward to welcoming you.
                </div>
            </div>
        </div>
    </div>
</div>

<jsp:include page="../common/footer.jsp" />
