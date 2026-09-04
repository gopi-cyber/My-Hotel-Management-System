<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>
<%@ taglib prefix="fmt" uri="jakarta.tags.fmt" %>

<jsp:include page="../common/header.jsp" />
<jsp:include page="../common/navbar.jsp" />

<div class="container py-4 flex-grow-1">
    <!-- Header -->
    <div class="d-flex justify-content-between align-items-center mb-4 pb-2 border-bottom border-secondary border-opacity-25">
        <div>
            <h2 class="fw-bold text-white mb-1"><i class="fa-solid fa-concierge-bell text-info me-2"></i>Front Desk & Receptionist Console</h2>
            <p class="text-secondary mb-0">Manage guest check-ins, check-outs, room statuses, and active service requests.</p>
        </div>
    </div>

    <!-- Live Reservations Check-In / Out Section -->
    <div class="glass-card p-4 mb-4">
        <div class="d-flex justify-content-between align-items-center mb-3">
            <h5 class="fw-bold text-white mb-0"><i class="fa-solid fa-list-check text-primary me-2"></i>Guest Reservations & Front Desk Operations</h5>
            <span class="badge bg-info text-dark rounded-pill px-3">${bookings.size()} Total Bookings</span>
        </div>

        <div class="table-responsive">
            <table class="table table-custom mb-0">
                <thead>
                    <tr>
                        <th>Ref & Guest</th>
                        <th>Room</th>
                        <th>Dates</th>
                        <th>Status</th>
                        <th>Payment</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <c:forEach var="b" items="${bookings}">
                        <tr>
                            <td>
                                <div class="fw-bold text-info">${b.bookingReference}</div>
                                <div class="text-white">${b.guestName}</div>
                                <div class="text-secondary small">${b.guestEmail} &bull; ${b.guestPhone}</div>
                            </td>
                            <td>
                                <span class="badge bg-dark border border-secondary text-white">Room ${b.roomNumber}</span>
                                <div class="text-secondary small">${b.roomType}</div>
                            </td>
                            <td>
                                <div><span class="text-secondary small">In:</span> ${b.checkInDate}</div>
                                <div><span class="text-secondary small">Out:</span> ${b.checkOutDate} (${b.nights}n)</div>
                            </td>
                            <td>
                                <span class="badge ${b.status eq 'CHECKED_IN' ? 'bg-success' : (b.status eq 'CHECKED_OUT' ? 'bg-secondary' : 'bg-primary')}">
                                    ${b.status}
                                </span>
                            </td>
                            <td>
                                <span class="badge ${b.paymentStatus eq 'PAID' ? 'bg-success' : 'bg-warning text-dark'}">${b.paymentStatus}</span>
                            </td>
                            <td>
                                <c:choose>
                                    <c:when test="${b.status eq 'CONFIRMED' or b.status eq 'PENDING'}">
                                        <button class="btn btn-success btn-sm rounded-pill px-3" 
                                                onclick="openCheckInModal('${b.id}', '${b.bookingReference}', '${b.guestName}', '${b.roomNumber}')">
                                            <i class="fa-solid fa-key me-1"></i> Check-In
                                        </button>
                                    </c:when>
                                    <c:when test="${b.status eq 'CHECKED_IN'}">
                                        <form action="${pageContext.request.contextPath}/receptionist/checkout/${b.id}" method="POST" style="display:inline;">
                                            <button type="submit" class="btn btn-warning btn-sm rounded-pill px-3" onclick="return confirm('Confirm check-out for guest?')">
                                                <i class="fa-solid fa-door-open me-1"></i> Check-Out
                                            </button>
                                        </form>
                                    </c:when>
                                    <c:otherwise>
                                        <span class="text-secondary small">Completed</span>
                                    </c:otherwise>
                                </c:choose>
                            </td>
                        </tr>
                    </c:forEach>
                </tbody>
            </table>
        </div>
    </div>

    <!-- Room Status Manager Grid -->
    <div class="row g-4 mb-4">
        <div class="col-lg-6">
            <div class="glass-card p-4 h-100">
                <h5 class="fw-bold text-white mb-3"><i class="fa-solid fa-door-closed text-warning me-2"></i>Room Status Monitor</h5>
                <div class="table-responsive">
                    <table class="table table-custom mb-0">
                        <thead>
                            <tr>
                                <th>Room</th>
                                <th>Type</th>
                                <th>Current Status</th>
                                <th>Change Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <c:forEach var="r" items="${rooms}">
                                <tr>
                                    <td class="fw-bold text-white">Room ${r.roomNumber}</td>
                                    <td class="small text-secondary">${r.type}</td>
                                    <td><span class="badge badge-status-${r.status}">${r.status}</span></td>
                                    <td>
                                        <form action="${pageContext.request.contextPath}/receptionist/room/status" method="POST" class="d-flex gap-1">
                                            <input type="hidden" name="roomId" value="${r.id}">
                                            <select name="status" class="form-select form-select-sm form-select-custom" style="width: 130px;">
                                                <option value="available" ${r.status eq 'available' ? 'selected' : ''}>available</option>
                                                <option value="occupied" ${r.status eq 'occupied' ? 'selected' : ''}>occupied</option>
                                                <option value="cleaning" ${r.status eq 'cleaning' ? 'selected' : ''}>cleaning</option>
                                                <option value="maintenance" ${r.status eq 'maintenance' ? 'selected' : ''}>maintenance</option>
                                            </select>
                                            <button type="submit" class="btn btn-outline-info btn-sm rounded-3"><i class="fa-solid fa-check"></i></button>
                                        </form>
                                    </td>
                                </tr>
                            </c:forEach>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <!-- Guest Services Management -->
        <div class="col-lg-6">
            <div class="glass-card p-4 h-100">
                <h5 class="fw-bold text-white mb-3"><i class="fa-solid fa-bell-concierge text-success me-2"></i>Service Requests Management</h5>
                <div class="table-responsive">
                    <table class="table table-custom mb-0">
                        <thead>
                            <tr>
                                <th>Room & Service</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <c:forEach var="s" items="${services}">
                                <tr>
                                    <td>
                                        <div class="fw-bold text-white">Room ${s.roomNumber} &bull; ${s.serviceType}</div>
                                        <div class="text-secondary small">${s.description}</div>
                                    </td>
                                    <td>
                                        <span class="badge ${s.status eq 'COMPLETED' ? 'bg-success' : 'bg-warning text-dark'}">${s.status}</span>
                                    </td>
                                    <td>
                                        <form action="${pageContext.request.contextPath}/receptionist/service/status" method="POST" class="d-flex gap-1">
                                            <input type="hidden" name="serviceId" value="${s.id}">
                                            <select name="status" class="form-select form-select-sm form-select-custom" style="width: 120px;">
                                                <option value="PENDING" ${s.status eq 'PENDING' ? 'selected' : ''}>PENDING</option>
                                                <option value="IN_PROGRESS" ${s.status eq 'IN_PROGRESS' ? 'selected' : ''}>IN_PROGRESS</option>
                                                <option value="COMPLETED" ${s.status eq 'COMPLETED' ? 'selected' : ''}>COMPLETED</option>
                                            </select>
                                            <button type="submit" class="btn btn-outline-success btn-sm rounded-3"><i class="fa-solid fa-check"></i></button>
                                        </form>
                                    </td>
                                </tr>
                            </c:forEach>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Check-In Modal -->
<div class="modal fade" id="checkInModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content glass-card text-white border border-secondary">
            <div class="modal-header border-secondary border-opacity-25">
                <h5 class="modal-title fw-bold"><i class="fa-solid fa-id-card text-info me-2"></i>Guest Check-In Form</h5>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
            </div>
            <form action="${pageContext.request.contextPath}/receptionist/checkin" method="POST">
                <div class="modal-body">
                    <input type="hidden" name="bookingId" id="ciBookingId">
                    <p class="text-info small mb-3">Booking: <span id="ciBookingRef" class="fw-bold"></span> &bull; Guest: <span id="ciGuestName" class="fw-bold"></span> &bull; Room: <span id="ciRoomNumber" class="fw-bold"></span></p>

                    <div class="mb-3">
                        <label class="form-label text-secondary small fw-semibold">ID Proof Type</label>
                        <select name="idProofType" class="form-select form-select-custom" required>
                            <option value="Passport">Passport</option>
                            <option value="Driver License">Driver's License</option>
                            <option value="National ID">National Identity Card</option>
                        </select>
                    </div>

                    <div class="mb-3">
                        <label class="form-label text-secondary small fw-semibold">ID Proof Number</label>
                        <input type="text" name="idProofNumber" class="form-control form-control-custom" placeholder="e.g. PASS-98765432" required>
                    </div>

                    <div class="mb-3">
                        <label class="form-label text-secondary small fw-semibold">Front Desk Notes</label>
                        <textarea name="notes" class="form-control form-control-custom" rows="2" placeholder="Key card #101 issued, baggage assisted"></textarea>
                    </div>
                </div>
                <div class="modal-footer border-secondary border-opacity-25">
                    <button type="button" class="btn btn-outline-light rounded-pill" data-bs-dismiss="modal">Cancel</button>
                    <button type="submit" class="btn btn-gradient rounded-pill px-4">Complete Check-In</button>
                </div>
            </form>
        </div>
    </div>
</div>

<script>
function openCheckInModal(id, ref, name, roomNo) {
    document.getElementById('ciBookingId').value = id;
    document.getElementById('ciBookingRef').innerText = ref;
    document.getElementById('ciGuestName').innerText = name;
    document.getElementById('ciRoomNumber').innerText = roomNo;
    new bootstrap.Modal(document.getElementById('checkInModal')).show();
}
</script>

<jsp:include page="../common/footer.jsp" />
