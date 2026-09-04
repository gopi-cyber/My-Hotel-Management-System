<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>

<jsp:include page="../common/header.jsp" />
<jsp:include page="../common/navbar.jsp" />

<div class="container py-4 flex-grow-1">
    <div class="d-flex justify-content-between align-items-center mb-4 pb-2 border-bottom border-secondary border-opacity-25">
        <div>
            <h2 class="fw-bold text-white mb-1"><i class="fa-solid fa-bell-concierge text-primary me-2"></i>Guest Room Services</h2>
            <p class="text-secondary mb-0">Request room cleaning, dining service, laundry, or maintenance assistance.</p>
        </div>
    </div>

    <div class="row g-4">
        <!-- Request Form -->
        <div class="col-lg-5">
            <div class="glass-card p-4">
                <h5 class="fw-bold text-white mb-3"><i class="fa-solid fa-plus-circle text-info me-2"></i>New Service Request</h5>
                
                <form action="${pageContext.request.contextPath}/guest/services/request" method="POST">
                    <div class="mb-3">
                        <label class="form-label text-secondary small fw-semibold">Your Room Number</label>
                        <select name="roomNumber" class="form-select form-select-custom" required>
                            <c:forEach var="b" items="${userBookings}">
                                <option value="${b.roomNumber}">Room ${b.roomNumber} (${b.roomType})</option>
                            </c:forEach>
                            <option value="101">Room 101</option>
                            <option value="102">Room 102</option>
                            <option value="103">Room 103</option>
                            <option value="201">Room 201</option>
                            <option value="202">Room 202</option>
                        </select>
                    </div>

                    <div class="mb-3">
                        <label class="form-label text-secondary small fw-semibold">Service Type</label>
                        <select name="serviceType" class="form-select form-select-custom" required>
                            <option value="Housekeeping">Housekeeping & Cleaning</option>
                            <option value="Room Service">Room Service & Dining</option>
                            <option value="Laundry">Laundry & Dry Cleaning</option>
                            <option value="Maintenance">Maintenance & Repairs</option>
                            <option value="Transportation">Airport Transportation / Taxi</option>
                            <option value="Wakeup Call">Wake-up Call</option>
                        </select>
                    </div>

                    <div class="mb-3">
                        <label class="form-label text-secondary small fw-semibold">Priority Level</label>
                        <select name="priority" class="form-select form-select-custom">
                            <option value="LOW">Low</option>
                            <option value="MEDIUM" selected>Medium</option>
                            <option value="HIGH">High</option>
                            <option value="URGENT">Urgent</option>
                        </select>
                    </div>

                    <div class="mb-4">
                        <label class="form-label text-secondary small fw-semibold">Description / Notes</label>
                        <textarea name="description" class="form-control form-control-custom" rows="3" placeholder="Please provide details (e.g. Extra pillows, clean towels, breakfast order)" required></textarea>
                    </div>

                    <button type="submit" class="btn btn-gradient w-100 py-2 rounded-pill fw-bold">
                        <i class="fa-solid fa-paper-plane me-1"></i> Submit Request
                    </button>
                </form>
            </div>
        </div>

        <!-- Request Tracking List -->
        <div class="col-lg-7">
            <div class="glass-card p-4">
                <h5 class="fw-bold text-white mb-3"><i class="fa-solid fa-list-check text-primary me-2"></i>My Requests Status</h5>

                <c:choose>
                    <c:when test="${not empty services}">
                        <div class="table-responsive">
                            <table class="table table-custom mb-0">
                                <thead>
                                    <tr>
                                        <th>Service</th>
                                        <th>Room</th>
                                        <th>Details</th>
                                        <th>Priority</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <c:forEach var="s" items="${services}">
                                        <tr>
                                            <td class="fw-bold text-info">${s.serviceType}</td>
                                            <td>Room ${s.roomNumber}</td>
                                            <td class="small text-secondary">${s.description}</td>
                                            <td>
                                                <span class="badge ${s.priority eq 'URGENT' ? 'bg-danger' : (s.priority eq 'HIGH' ? 'bg-warning text-dark' : 'bg-secondary')}">
                                                    ${s.priority}
                                                </span>
                                            </td>
                                            <td>
                                                <span class="badge ${s.status eq 'COMPLETED' ? 'bg-success' : (s.status eq 'IN_PROGRESS' ? 'bg-info' : 'bg-dark border border-secondary text-warning')}">
                                                    ${s.status}
                                                </span>
                                            </td>
                                        </tr>
                                    </c:forEach>
                                </tbody>
                            </table>
                        </div>
                    </c:when>
                    <c:otherwise>
                        <div class="text-center py-5 text-secondary">
                            <i class="fa-solid fa-circle-check fs-1 mb-2 text-success d-block"></i>
                            No open service requests at this time.
                        </div>
                    </c:otherwise>
                </c:choose>
            </div>
        </div>
    </div>
</div>

<jsp:include page="../common/footer.jsp" />
